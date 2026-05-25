// NEW: 6 PM EOD reminder via Lepton Marketing Bot (unified).
// Replaces the static Slack "EOD update reminder 6 PM" workflow.
// Lists each person's ALL open tickets, asks them to update before EOD.

const PEOPLE = [
  { name: 'Swadhin', email: 'swadhin@leptonsoftware.com',          accountId: '712020:262e57bb-d008-4e8f-973a-734d3b19e12e' },
  { name: 'Lakshay', email: 'lakshay.chachra@leptonsoftware.com',  accountId: '712020:c30d55c4-5bfe-4564-847a-df50d29665a3' },
  { name: 'Chetna',  email: 'chetna.bhatia@leptonsoftware.com',    accountId: '712020:1a3f2ee1-53d8-44de-91f6-b088ef327f3e' },
  { name: 'Plash',   email: 'plash.saini@leptonsoftware.com',      accountId: '712020:7d2a8edd-cd85-447a-8953-ec9fa7333218' }
];

const PRIORITY_REMAP = { 'Highest': 'P0', 'High': 'P1', 'Medium': 'P2', 'Low': 'P3', 'Lowest': 'P4' };
const PRIORITY_RANK  = { 'Highest': 0,    'High': 1,    'Medium': 2,    'Low': 3,    'Lowest': 4    };

export default async function handler(req, res) {
  const cronAuth = process.env.CRON_SECRET;
  const auth = req.headers.authorization || '';
  if (cronAuth && auth !== `Bearer ${cronAuth}`) {
    if (req.query.test !== '1') {
      return res.status(401).json({ error: 'Unauthorized — append ?test=1 for manual test' });
    }
  }

  const env = readEnv();
  if (env.error) return res.status(500).json(env.error);

  const isTest = req.query.test === '1';
  const peopleToProcess = isTest ? PEOPLE.filter(p => p.name === 'Lakshay') : PEOPLE;

  const results = [];
  for (const person of peopleToProcess) {
    try {
      const tickets = await fetchOpenTickets(env, person.accountId);
      const message = buildMessage(person.name, tickets);
      const slackUserId = await lookupSlackUser(env.botToken, person.email);
      if (!slackUserId) {
        results.push({ name: person.name, error: `Slack user not found for ${person.email}` });
        continue;
      }
      const sent = await sendBotDM(env.botToken, slackUserId, message);
      results.push({ name: person.name, slackUserId, ticketCount: tickets.length, sent: sent.ok, error: sent.error });
    } catch (e) {
      results.push({ name: person.name, error: String(e) });
    }
  }

  res.status(200).json({ ranAt: new Date().toISOString(), results });
}

function readEnv() {
  const JIRA_EMAIL = (process.env.JIRA_EMAIL || '').trim();
  const JIRA_TOKEN = (process.env.JIRA_TOKEN || '').trim();
  const JIRA_BASE_URL = (process.env.JIRA_BASE_URL || '').trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
  const botToken = (process.env.SLACK_BOT_TOKEN || '').trim();
  if (!JIRA_EMAIL || !JIRA_TOKEN || !JIRA_BASE_URL) return { error: { error: 'Missing Jira env vars' } };
  if (!botToken) return { error: { error: 'Missing SLACK_BOT_TOKEN' } };
  const jiraAuth = Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString('base64');
  return { JIRA_BASE_URL, jiraAuth, botToken };
}

async function fetchOpenTickets(env, accountId) {
  const r = await fetch(`https://${env.JIRA_BASE_URL}/rest/api/3/search/jql`, {
    method: 'POST',
    headers: { 'Authorization': `Basic ${env.jiraAuth}`, 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jql: `project = LMR AND assignee = "${accountId}" AND statusCategory != Done ORDER BY priority DESC, duedate ASC`,
      fields: ['summary', 'priority', 'duedate', 'status'],
      maxResults: 50
    })
  });
  if (!r.ok) throw new Error(`Jira ${r.status}`);
  const data = await r.json();
  return (data.issues || []).map(i => ({
    key: i.key,
    summary: i.fields.summary,
    priority: i.fields.priority?.name || 'None',
    duedate: i.fields.duedate,
    status: i.fields.status?.name,
    url: `https://${env.JIRA_BASE_URL}/browse/${i.key}`
  }));
}

async function lookupSlackUser(botToken, email) {
  const r = await fetch(`https://slack.com/api/users.lookupByEmail?email=${encodeURIComponent(email)}`, {
    headers: { 'Authorization': `Bearer ${botToken}` }
  });
  const data = await r.json();
  return data.user?.id || null;
}

async function sendBotDM(botToken, userId, text) {
  const r = await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${botToken}`, 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ channel: userId, text })
  });
  const data = await r.json();
  return { ok: data.ok, error: data.ok ? null : data.error };
}

function buildMessage(name, tickets) {
  if (tickets.length === 0) {
    return `Hi ${name} :wave:\n\n` +
      `EOD check-in: you have no open tickets. Great work today — log off whenever you're done.\n\n` +
      `:bar_chart: Team dashboard: https://lepton-marketing-dashboard.vercel.app`;
  }

  // Sort by priority then due
  tickets.sort((a, b) => (PRIORITY_RANK[a.priority] ?? 9) - (PRIORITY_RANK[b.priority] ?? 9));

  // Show only top 10 to keep DM scannable; mention overflow if more
  const top = tickets.slice(0, 10);
  const overflow = tickets.length - top.length;

  const lines = top.map(t => {
    const due = formatDue(t.duedate);
    const priority = PRIORITY_REMAP[t.priority] || t.priority;
    return `• ${t.key} (${priority}) — ${t.summary} — Due ${due}\n  ${t.url}`;
  }).join('\n');

  const firstKey = top[0].key;
  const overflowNote = overflow > 0
    ? `\n_(+ ${overflow} more — full list on the dashboard)_\n`
    : '';

  return `Hi ${name} :wave:\n\n` +
    `:clock6: *EOD check-in* — please mark progress on your open tickets before logging off.\n\n` +
    `You have ${tickets.length} open ticket${tickets.length === 1 ? '' : 's'}:\n\n` +
    `${lines}${overflowNote}\n\n` +
    `:speech_balloon: *Reply right here to update — just type:*\n` +
    `• \`${firstKey}: status update text\`  (adds comment)\n` +
    `• \`${firstKey}: done\`  (marks Done)\n` +
    `• \`${firstKey}: in progress\`  (marks In Progress)\n` +
    `Multiple tickets in one message — one ticket per line.\n\n` +
    `:bar_chart: Team dashboard: https://lepton-marketing-dashboard.vercel.app`;
}

function formatDue(iso) {
  if (!iso) return 'no date';
  const d = new Date(iso + 'T00:00:00');
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}
