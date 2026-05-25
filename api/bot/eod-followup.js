// NEW: 8 PM smart follow-up via Lepton Marketing Bot.
// Replaces /api/cron/eod-followup.js once verified.
// Only DMs people who haven't updated any ticket today.

const PEOPLE = [
  { name: 'Swadhin', email: 'swadhin@leptonsoftware.com',          accountId: '712020:262e57bb-d008-4e8f-973a-734d3b19e12e' },
  { name: 'Lakshay', email: 'lakshay.chachra@leptonsoftware.com',  accountId: '712020:c30d55c4-5bfe-4564-847a-df50d29665a3' },
  { name: 'Chetna',  email: 'chetna.bhatia@leptonsoftware.com',    accountId: '712020:1a3f2ee1-53d8-44de-91f6-b088ef327f3e' },
  { name: 'Plash',   email: 'plash.saini@leptonsoftware.com',      accountId: '712020:7d2a8edd-cd85-447a-8953-ec9fa7333218' }
];

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
      const updatedJql = `project = LMR AND assignee = "${person.accountId}" AND updated >= startOfDay()`;
      const openJql = `project = LMR AND assignee = "${person.accountId}" AND statusCategory != Done`;
      const [updated, open] = await Promise.all([
        fetchJiraCount(env, updatedJql),
        fetchJiraCount(env, openJql)
      ]);

      if (updated > 0) {
        results.push({ name: person.name, skipped: true, reason: `${updated} ticket(s) updated today` });
        continue;
      }
      if (open === 0) {
        results.push({ name: person.name, skipped: true, reason: 'no open tickets' });
        continue;
      }

      const message = buildMessage(person.name, person.accountId, open, env.JIRA_BASE_URL);
      const slackUserId = await lookupSlackUser(env.botToken, person.email);
      if (!slackUserId) {
        results.push({ name: person.name, error: `Slack user not found for ${person.email}` });
        continue;
      }
      const sent = await sendBotDM(env.botToken, slackUserId, message);
      results.push({ name: person.name, slackUserId, nudged: true, openCount: open, sent: sent.ok, error: sent.error });
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

async function fetchJiraCount(env, jql) {
  const r = await fetch(`https://${env.JIRA_BASE_URL}/rest/api/3/search/jql`, {
    method: 'POST',
    headers: { 'Authorization': `Basic ${env.jiraAuth}`, 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ jql, fields: ['summary'], maxResults: 100 })
  });
  if (!r.ok) throw new Error(`Jira ${r.status}`);
  const data = await r.json();
  return (data.issues || []).length;
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

function buildMessage(name, accountId, openCount, baseUrl) {
  const openUrl =
    `https://${baseUrl}/issues?jql=` +
    encodeURIComponent(`project = LMR AND assignee = "${accountId}" AND statusCategory != Done ORDER BY priority DESC, duedate ASC`);

  return `Hi ${name} :wave:\n\n` +
    `Quick nudge — looks like you haven't updated any of your tickets today.\n` +
    `You have ${openCount} open ticket${openCount === 1 ? '' : 's'}. Could you take 2 minutes before EOD to mark progress?\n\n` +
    `:speech_balloon: *Reply right here* — type \`LMR-XX: your update\` or \`LMR-XX: done\`. Multiple tickets in one message work.\n\n` +
    `Or see them all: ${openUrl}\n\n` +
    `Lakshay will get an EOD summary at 9 PM. Thanks for keeping it tidy! :pray:`;
}
