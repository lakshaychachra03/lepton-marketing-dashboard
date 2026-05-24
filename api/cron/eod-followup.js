// Vercel cron: runs at 8 PM IST every weekday.
// For each person, checks if any of their tickets were updated today.
// If NOT updated, sends a friendly follow-up nudge via Slack webhook.
// People who already updated today are skipped (no spam).

const PEOPLE = [
  { name: 'Swadhin', accountId: '712020:262e57bb-d008-4e8f-973a-734d3b19e12e', webhookEnv: 'SLACK_WEBHOOK_SWADHIN' },
  { name: 'Lakshay', accountId: '712020:c30d55c4-5bfe-4564-847a-df50d29665a3', webhookEnv: 'SLACK_WEBHOOK_LAKSHAY' },
  { name: 'Chetna', accountId: '712020:1a3f2ee1-53d8-44de-91f6-b088ef327f3e', webhookEnv: 'SLACK_WEBHOOK_CHETNA' },
  { name: 'Plash', accountId: '712020:7d2a8edd-cd85-447a-8953-ec9fa7333218', webhookEnv: 'SLACK_WEBHOOK_PLASH' }
];

export default async function handler(req, res) {
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

  for (const person of PEOPLE) {
    const webhookUrl = process.env[person.webhookEnv];
    if (!webhookUrl) {
      results.push({ name: person.name, skipped: true, reason: `${person.webhookEnv} not set` });
      continue;
    }

    // Did any of their tickets get touched today?
    let updatedCount = 0;
    let openCount = 0;
    try {
      const checkJql = `project = LMR AND assignee = "${person.accountId}" AND updated >= startOfDay()`;
      const openJql = `project = LMR AND assignee = "${person.accountId}" AND statusCategory != Done`;

      const [updatedRes, openRes] = await Promise.all([
        fetchJira(JIRA_BASE_URL, jiraAuth, checkJql),
        fetchJira(JIRA_BASE_URL, jiraAuth, openJql)
      ]);

      updatedCount = (updatedRes.issues || []).length;
      openCount = (openRes.issues || []).length;
    } catch (e) {
      results.push({ name: person.name, error: `Jira check failed: ${e.message}` });
      continue;
    }

    if (updatedCount > 0) {
      results.push({ name: person.name, skipped: true, reason: `${updatedCount} ticket(s) updated today` });
      continue;
    }

    if (openCount === 0) {
      results.push({ name: person.name, skipped: true, reason: 'no open tickets — nothing to nudge about' });
      continue;
    }

    // Send follow-up nudge
    const message = buildFollowupMessage(person.name, person.accountId, openCount, JIRA_BASE_URL);

    try {
      const slackRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message })
      });
      results.push({
        name: person.name,
        nudged: true,
        openCount,
        slackStatus: slackRes.status,
        ok: slackRes.ok
      });
    } catch (e) {
      results.push({ name: person.name, error: `Slack POST failed: ${e.message}` });
    }
  }

  res.status(200).json({
    ranAt: new Date().toISOString(),
    results
  });
}

async function fetchJira(baseUrl, auth, jql) {
  const r = await fetch(`https://${baseUrl}/rest/api/3/search/jql`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ jql, fields: ['summary'], maxResults: 50 })
  });
  if (!r.ok) throw new Error(`Jira ${r.status}`);
  return r.json();
}

function buildFollowupMessage(name, accountId, openCount, baseUrl) {
  const openUrl =
    `https://${baseUrl}/issues?jql=` +
    encodeURIComponent(`project = LMR AND assignee = "${accountId}" AND statusCategory != Done ORDER BY priority DESC, duedate ASC`);

  return `Hi ${name} :wave:\n\n` +
    `Quick nudge — looks like you haven't updated any of your tickets today.\n` +
    `You have ${openCount} open ticket${openCount === 1 ? '' : 's'}. Could you take 2 minutes before EOD to mark progress or add a comment?\n\n` +
    `Open tickets:\n${openUrl}\n\n` +
    `Fastest way from Slack:\n` +
    `• /jira transition LMR-XX  → change status\n` +
    `• /jira comment LMR-XX <update>  → add comment\n\n` +
    `Lakshay will get a summary at 9 PM. Thanks for keeping it tidy! :pray:`;
}
