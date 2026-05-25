// NEW: Morning DM via Lepton Marketing Bot (unified).
// Replaces /api/cron/morning-dm.js once verified.
// Sends each person their P0/P1 task list as a DM from the bot.

const PEOPLE = [
  { name: 'Swadhin', email: 'swadhin@leptonsoftware.com',          accountId: '712020:262e57bb-d008-4e8f-973a-734d3b19e12e' },
  { name: 'Lakshay', email: 'lakshay.chachra@leptonsoftware.com',  accountId: '712020:c30d55c4-5bfe-4564-847a-df50d29665a3' },
  { name: 'Chetna',  email: 'chetna.bhatia@leptonsoftware.com',    accountId: '712020:1a3f2ee1-53d8-44de-91f6-b088ef327f3e' },
  { name: 'Plash',   email: 'plash.saini@leptonsoftware.com',      accountId: '712020:7d2a8edd-cd85-447a-8953-ec9fa7333218' }
];

const JQL_TEMPLATE = (accountId) =>
  `project = LMR AND assignee = "${accountId}" AND statusCategory != Done AND priority in (Highest, High) ORDER BY priority DESC, duedate ASC`;

const PRIORITY_REMAP = { 'Highest': 'P0', 'High': 'P1', 'Medium': 'P2', 'Low': 'P3', 'Lowest': 'P4' };

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
      const tickets = await fetchPriorityTickets(env, person.accountId);
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

async function fetchPriorityTickets(env, accountId) {
  const r = await fetch(`https://${env.JIRA_BASE_URL}/rest/api/3/search/jql`, {
    method: 'POST',
    headers: { 'Authorization': `Basic ${env.jiraAuth}`, 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jql: JQL_TEMPLATE(accountId),
      fields: ['summary', 'priority', 'duedate', 'status'],
      maxResults: 20
    })
  });
  if (!r.ok) throw new Error(`Jira ${r.status}`);
  const data = await r.json();
  return (data.issues || []).map(i => ({
    key: i.key,
    summary: i.fields.summary,
    priority: i.fields.priority?.name || 'None',
    duedate: i.fields.duedate,
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
    return `Good morning ${name} :sunny:\n\n` +
      `Nothing on your P0/P1 list today — clear plate.\n` +
      `Use the time for P2/P3 backlog or get ahead on next week.\n\n` +
      `:bar_chart: Team dashboard: https://lepton-marketing-dashboard.vercel.app`;
  }

  const lines = tickets.map(t => {
    const due = formatDue(t.duedate);
    const priority = PRIORITY_REMAP[t.priority] || t.priority;
    return `• ${t.key} (${priority}) — ${t.summary} — Due ${due}\n  ${t.url}`;
  }).join('\n');

  const taskWord = tickets.length === 1 ? 'task' : 'tasks';
  const firstKey = tickets[0].key;
  return `Good morning ${name} :sunny:\n\n` +
    `You have ${tickets.length} top-priority ${taskWord} today:\n\n` +
    `${lines}\n\n` +
    `:speech_balloon: *Reply right here to update — just type the ticket and your update.*\n` +
    `Examples:\n` +
    `• \`${firstKey}: finished the draft, sent for review\`\n` +
    `• \`${firstKey}: done\`  (marks Done)\n` +
    `• \`${firstKey}: in progress\`  (marks In Progress)\n` +
    `Multiple tickets in one message work — one ticket per line.\n\n` +
    `:bar_chart: Team dashboard: https://lepton-marketing-dashboard.vercel.app`;
}

function formatDue(iso) {
  if (!iso) return 'no date';
  const d = new Date(iso + 'T00:00:00');
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}
