// Vercel cron: runs at 9 AM IST every weekday.
// For each person on the team, queries Jira for their top-priority tickets,
// formats the result, and POSTs to that person's Slack workflow webhook.
// The Slack workflow then DMs the person with the formatted message.

const PEOPLE = [
  { name: 'Swadhin', accountId: '712020:262e57bb-d008-4e8f-973a-734d3b19e12e', webhookEnv: 'SLACK_WEBHOOK_SWADHIN' },
  { name: 'Lakshay', accountId: '712020:c30d55c4-5bfe-4564-847a-df50d29665a3', webhookEnv: 'SLACK_WEBHOOK_LAKSHAY' },
  { name: 'Chetna', accountId: '712020:1a3f2ee1-53d8-44de-91f6-b088ef327f3e', webhookEnv: 'SLACK_WEBHOOK_CHETNA' },
  { name: 'Plash', accountId: '712020:7d2a8edd-cd85-447a-8953-ec9fa7333218', webhookEnv: 'SLACK_WEBHOOK_PLASH' }
];

const JQL_TEMPLATE = (accountId) =>
  `project = LMR AND assignee = "${accountId}" AND statusCategory != Done AND priority in (Highest, High) ORDER BY priority DESC, duedate ASC`;

export default async function handler(req, res) {
  // Vercel cron sends a special header. Allow manual test from browser too if no header set.
  const cronAuth = process.env.CRON_SECRET;
  const auth = req.headers.authorization || '';
  if (cronAuth && auth !== `Bearer ${cronAuth}`) {
    if (req.query.test !== '1') {
      return res.status(401).json({ error: 'Unauthorized — append ?test=1 for manual test' });
    }
  }

  const JIRA_EMAIL = (process.env.JIRA_EMAIL || '').trim();
  const JIRA_TOKEN = (process.env.JIRA_TOKEN || '').trim();
  const JIRA_BASE_URL = (process.env.JIRA_BASE_URL || '').trim().replace(/^https?:\/\//, '').replace(/\/$/, '');

  if (!JIRA_EMAIL || !JIRA_TOKEN || !JIRA_BASE_URL) {
    return res.status(500).json({ error: 'Missing Jira env vars' });
  }

  const jiraAuth = Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString('base64');
  const results = [];

  // Test mode: ?test=1 sends only to Lakshay for safe verification.
  const isTest = req.query.test === '1';
  const peopleToProcess = isTest ? PEOPLE.filter(p => p.name === 'Lakshay') : PEOPLE;

  for (const person of peopleToProcess) {
    const webhookUrl = process.env[person.webhookEnv];
    if (!webhookUrl) {
      results.push({ name: person.name, skipped: true, reason: `${person.webhookEnv} not set` });
      continue;
    }

    let tickets = [];
    try {
      const jiraRes = await fetch(`https://${JIRA_BASE_URL}/rest/api/3/search/jql`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${jiraAuth}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jql: JQL_TEMPLATE(person.accountId),
          fields: ['summary', 'priority', 'duedate', 'status'],
          maxResults: 20
        })
      });
      const jiraData = await jiraRes.json();
      tickets = (jiraData.issues || []).map(i => ({
        key: i.key,
        summary: i.fields.summary,
        priority: i.fields.priority?.name || 'None',
        duedate: i.fields.duedate,
        status: i.fields.status?.name || 'Unknown',
        url: `https://${JIRA_BASE_URL}/browse/${i.key}`
      }));
    } catch (e) {
      results.push({ name: person.name, error: `Jira fetch failed: ${e.message}` });
      continue;
    }

    const message = buildMorningMessage(person.name, tickets);

    try {
      const slackRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message })
      });
      results.push({
        name: person.name,
        ticketCount: tickets.length,
        slackStatus: slackRes.status,
        ok: slackRes.ok
      });
    } catch (e) {
      results.push({ name: person.name, error: `Slack POST failed: ${e.message}` });
    }
  }

  res.status(200).json({
    ranAt: new Date().toISOString(),
    timezone: 'UTC (Vercel runs in UTC)',
    results
  });
}

const PRIORITY_REMAP = { 'Highest': 'P0', 'High': 'P1', 'Medium': 'P2', 'Low': 'P3', 'Lowest': 'P4' };

function buildMorningMessage(name, tickets) {
  if (tickets.length === 0) {
    return `Good morning ${name} :sunny:\n\n` +
      `Nothing on your P0/P1 priority list today — clear plate.\n` +
      `Use the time for P2/P3 backlog or get ahead on next week.\n\n` +
      `Team dashboard: https://lepton-marketing-dashboard.vercel.app`;
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
    `:arrows_counterclockwise: *How to update — type these in #lepton-marketing channel:*\n` +
    `• To add a comment:   \`/jira comment ${firstKey} finished the design draft\`\n` +
    `• To change status:   \`/jira transition ${firstKey}\`  (a picker pops up: To Do / In Progress / Done)\n` +
    `• To reassign:        \`/jira assign ${firstKey} @teammate\`\n\n` +
    `:warning: Slash commands won't work in this DM (no Jira subscription here). Use #lepton-marketing or click the ticket link to open in Jira.\n\n` +
    `All updates are real-time — they appear in #lakshay-jira-alerts and refresh the live dashboard within 30 seconds.\n\n` +
    `:bar_chart: Team dashboard: https://lepton-marketing-dashboard.vercel.app`;
}

function formatDue(iso) {
  if (!iso) return 'no date';
  const d = new Date(iso + 'T00:00:00');
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}
