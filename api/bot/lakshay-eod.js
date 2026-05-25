// NEW: 9 PM Lakshay EOD summary via Lepton Marketing Bot.
// Replaces /api/cron/lakshay-eod.js once verified.
// Sends manager-style summary directly to Lakshay's bot DM.

const PEOPLE = [
  { name: 'Swadhin', accountId: '712020:262e57bb-d008-4e8f-973a-734d3b19e12e' },
  { name: 'Lakshay', accountId: '712020:c30d55c4-5bfe-4564-847a-df50d29665a3' },
  { name: 'Chetna',  accountId: '712020:1a3f2ee1-53d8-44de-91f6-b088ef327f3e' },
  { name: 'Plash',   accountId: '712020:7d2a8edd-cd85-447a-8953-ec9fa7333218' }
];

const LAKSHAY_EMAIL = 'lakshay.chachra@leptonsoftware.com';

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

  const perPerson = [];
  let totalDone = 0;
  const doneTickets = [];

  for (const p of PEOPLE) {
    try {
      const updatedJql = `project = LMR AND assignee = "${p.accountId}" AND updated >= startOfDay()`;
      const doneJql = `project = LMR AND assignee = "${p.accountId}" AND status = Done AND statusCategoryChangedDate >= startOfDay()`;
      const openJql = `project = LMR AND assignee = "${p.accountId}" AND statusCategory != Done`;
      const [updated, done, open] = await Promise.all([
        fetchJiraIssues(env, updatedJql),
        fetchJiraIssues(env, doneJql),
        fetchJiraIssues(env, openJql)
      ]);
      const personDone = done.map(i => ({ key: i.key, summary: i.fields.summary }));
      totalDone += personDone.length;
      doneTickets.push(...personDone.map(t => ({ ...t, owner: p.name })));
      perPerson.push({
        name: p.name,
        updatedCount: updated.length,
        doneCount: personDone.length,
        openCount: open.length
      });
    } catch (e) {
      perPerson.push({ name: p.name, error: e.message });
    }
  }

  const message = buildMessage(perPerson, doneTickets, totalDone);
  const slackUserId = await lookupSlackUser(env.botToken, LAKSHAY_EMAIL);
  if (!slackUserId) {
    return res.status(500).json({ error: `Slack user not found for ${LAKSHAY_EMAIL}` });
  }
  const sent = await sendBotDM(env.botToken, slackUserId, message);
  res.status(200).json({ ranAt: new Date().toISOString(), slackUserId, sent: sent.ok, error: sent.error, perPerson, totalDone });
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

async function fetchJiraIssues(env, jql) {
  const r = await fetch(`https://${env.JIRA_BASE_URL}/rest/api/3/search/jql`, {
    method: 'POST',
    headers: { 'Authorization': `Basic ${env.jiraAuth}`, 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ jql, fields: ['summary'], maxResults: 100 })
  });
  if (!r.ok) throw new Error(`Jira ${r.status}`);
  const data = await r.json();
  return data.issues || [];
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

function buildMessage(perPerson, doneTickets, totalDone) {
  const dateLabel = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata'
  });
  const lines = [`:moon: *EOD report — ${dateLabel}*`, ''];
  lines.push('*Team updates today:*');
  for (const p of perPerson) {
    if (p.error) { lines.push(`• ${p.name} — :warning: error: ${p.error}`); continue; }
    let icon = '✅';
    let note = `${p.updatedCount} ticket${p.updatedCount === 1 ? '' : 's'} updated`;
    if (p.doneCount > 0) note += `, ${p.doneCount} marked Done`;
    if (p.updatedCount === 0 && p.openCount > 0) {
      icon = '⚠️';
      note = `NO UPDATES today (${p.openCount} open) — was nudged at 8 PM`;
    } else if (p.updatedCount === 0 && p.openCount === 0) {
      icon = '🟢';
      note = 'no open tickets — clear plate';
    }
    lines.push(`${icon} ${p.name} — ${note}`);
  }
  lines.push('');
  if (totalDone > 0) {
    lines.push(`*Done today (${totalDone}):*`);
    for (const t of doneTickets) lines.push(`• ${t.key} (${t.owner}) — ${t.summary}`);
    lines.push('');
  }
  const missing = perPerson.filter(p => !p.error && p.updatedCount === 0 && p.openCount > 0);
  if (missing.length > 0) {
    lines.push('*Needs your follow-up:*');
    for (const p of missing) lines.push(`• ${p.name} — ${p.openCount} open, no updates today`);
    lines.push('');
  }
  lines.push('Dashboard: https://lepton-marketing-dashboard.vercel.app');
  return lines.join('\n');
}
