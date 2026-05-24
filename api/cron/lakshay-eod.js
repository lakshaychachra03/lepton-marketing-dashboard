// Vercel cron: runs at 9 PM IST every weekday.
// Builds an EOD report for Lakshay showing who did/didn't update today,
// what got marked Done, and any callouts. Sends to Lakshay's dedicated Slack webhook.

const PEOPLE = [
  { name: 'Swadhin', accountId: '712020:262e57bb-d008-4e8f-973a-734d3b19e12e' },
  { name: 'Lakshay', accountId: '712020:c30d55c4-5bfe-4564-847a-df50d29665a3' },
  { name: 'Chetna', accountId: '712020:1a3f2ee1-53d8-44de-91f6-b088ef327f3e' },
  { name: 'Plash', accountId: '712020:7d2a8edd-cd85-447a-8953-ec9fa7333218' }
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
  const lakshayWebhook = process.env.SLACK_WEBHOOK_LAKSHAY_EOD;

  if (!JIRA_EMAIL || !JIRA_TOKEN || !JIRA_BASE_URL) {
    return res.status(500).json({ error: 'Missing Jira env vars' });
  }
  if (!lakshayWebhook) {
    return res.status(500).json({ error: 'SLACK_WEBHOOK_LAKSHAY_EOD env var not set' });
  }

  const jiraAuth = Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString('base64');
  const perPerson = [];
  let totalDoneToday = 0;
  const doneTickets = [];

  for (const person of PEOPLE) {
    try {
      const updatedJql = `project = LMR AND assignee = "${person.accountId}" AND updated >= startOfDay()`;
      const doneJql = `project = LMR AND assignee = "${person.accountId}" AND status = Done AND statusCategoryChangedDate >= startOfDay()`;
      const openJql = `project = LMR AND assignee = "${person.accountId}" AND statusCategory != Done`;

      const [updated, done, open] = await Promise.all([
        fetchJira(JIRA_BASE_URL, jiraAuth, updatedJql, ['summary']),
        fetchJira(JIRA_BASE_URL, jiraAuth, doneJql, ['summary']),
        fetchJira(JIRA_BASE_URL, jiraAuth, openJql, ['summary'])
      ]);

      const personDone = (done.issues || []).map(i => ({ key: i.key, summary: i.fields.summary }));
      totalDoneToday += personDone.length;
      doneTickets.push(...personDone.map(t => ({ ...t, owner: person.name })));

      perPerson.push({
        name: person.name,
        updatedCount: (updated.issues || []).length,
        doneCount: personDone.length,
        openCount: (open.issues || []).length
      });
    } catch (e) {
      perPerson.push({ name: person.name, error: e.message });
    }
  }

  const message = buildEODMessage(perPerson, doneTickets, totalDoneToday, JIRA_BASE_URL);

  try {
    const slackRes = await fetch(lakshayWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message })
    });
    return res.status(200).json({
      ranAt: new Date().toISOString(),
      slackStatus: slackRes.status,
      ok: slackRes.ok,
      perPerson,
      totalDoneToday
    });
  } catch (e) {
    return res.status(500).json({ error: `Slack POST failed: ${e.message}`, perPerson });
  }
}

async function fetchJira(baseUrl, auth, jql, fields) {
  const r = await fetch(`https://${baseUrl}/rest/api/3/search/jql`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ jql, fields: fields || ['summary'], maxResults: 100 })
  });
  if (!r.ok) throw new Error(`Jira ${r.status}`);
  return r.json();
}

function buildEODMessage(perPerson, doneTickets, totalDone, baseUrl) {
  const dateLabel = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'short', year: 'numeric',
    timeZone: 'Asia/Kolkata'
  });

  const lines = [`:moon: *EOD report — ${dateLabel}*`, ''];

  // Per-person section
  lines.push('*Team updates today:*');
  for (const p of perPerson) {
    if (p.error) {
      lines.push(`• ${p.name} — :warning: error: ${p.error}`);
      continue;
    }
    let icon = '✅';
    let note = `${p.updatedCount} ticket${p.updatedCount === 1 ? '' : 's'} updated`;
    if (p.doneCount > 0) note += `, ${p.doneCount} marked Done`;
    if (p.updatedCount === 0 && p.openCount > 0) {
      icon = '⚠️';
      note = `NO UPDATES today (${p.openCount} open ticket${p.openCount === 1 ? '' : 's'}) — was nudged at 8 PM`;
    } else if (p.updatedCount === 0 && p.openCount === 0) {
      icon = '🟢';
      note = 'no open tickets — clear plate';
    }
    lines.push(`${icon} ${p.name} — ${note}`);
  }
  lines.push('');

  // Done today section
  if (totalDone > 0) {
    lines.push(`*Done today (${totalDone}):*`);
    for (const t of doneTickets) {
      lines.push(`• ${t.key} (${t.owner}) — ${t.summary}`);
    }
    lines.push('');
  }

  // Who needs follow-up
  const missing = perPerson.filter(p => !p.error && p.updatedCount === 0 && p.openCount > 0);
  if (missing.length > 0) {
    lines.push(`*Needs your follow-up:*`);
    for (const p of missing) {
      lines.push(`• ${p.name} — ${p.openCount} open, no updates today`);
    }
    lines.push('');
    lines.push('Suggested actions:');
    lines.push('• DM them directly OR');
    lines.push('• Escalate to Swadhin OR');
    lines.push('• Let it slide if you know they were OOO');
    lines.push('');
  }

  lines.push(`Dashboard: https://lepton-marketing-dashboard.vercel.app`);

  return lines.join('\n');
}
