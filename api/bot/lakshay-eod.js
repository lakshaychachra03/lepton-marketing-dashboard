// NEW: 9 PM Lakshay EOD summary via Lepton Marketing Bot.
// For each of the 4 active people: lists their P0/P1 tickets that
// got NO update today (no comment, no status change).

const PEOPLE = [
  { name: 'Swadhin', accountId: '712020:262e57bb-d008-4e8f-973a-734d3b19e12e' },
  { name: 'Lakshay', accountId: '712020:c30d55c4-5bfe-4564-847a-df50d29665a3' },
  { name: 'Chetna',  accountId: '712020:1a3f2ee1-53d8-44de-91f6-b088ef327f3e' },
  { name: 'Plash',   accountId: '712020:7d2a8edd-cd85-447a-8953-ec9fa7333218' }
];

const LAKSHAY_EMAIL = 'lakshay.chachra@leptonsoftware.com';

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

  const perPerson = [];
  let totalUntouched = 0;

  for (const p of PEOPLE) {
    try {
      const allOpenJql = `project = LMR AND assignee = "${p.accountId}" AND priority in (Highest, High) AND statusCategory != Done ORDER BY priority DESC, duedate ASC`;
      const updatedTodayJql = `project = LMR AND assignee = "${p.accountId}" AND priority in (Highest, High) AND statusCategory != Done AND updated >= startOfDay()`;
      const [allOpen, updatedToday] = await Promise.all([
        fetchJiraIssues(env, allOpenJql, ['summary', 'priority', 'duedate']),
        fetchJiraIssues(env, updatedTodayJql, ['summary'])
      ]);
      const touchedKeys = new Set(updatedToday.map(i => i.key));
      const untouched = allOpen
        .filter(i => !touchedKeys.has(i.key))
        .map(i => ({
          key: i.key,
          summary: i.fields.summary,
          priority: i.fields.priority?.name || 'None',
          duedate: i.fields.duedate,
          url: `https://${env.JIRA_BASE_URL}/browse/${i.key}`
        }));
      perPerson.push({
        name: p.name,
        totalP01: allOpen.length,
        untouchedCount: untouched.length,
        untouched
      });
      totalUntouched += untouched.length;
    } catch (e) {
      perPerson.push({ name: p.name, error: e.message });
    }
  }

  const message = buildMessage(perPerson, totalUntouched);
  const slackUserId = await lookupSlackUser(env.botToken, LAKSHAY_EMAIL);
  if (!slackUserId) {
    return res.status(500).json({ error: `Slack user not found for ${LAKSHAY_EMAIL}` });
  }
  const sent = await sendBotDM(env.botToken, slackUserId, message);
  res.status(200).json({ ranAt: new Date().toISOString(), slackUserId, sent: sent.ok, error: sent.error, perPerson, totalUntouched });
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

async function fetchJiraIssues(env, jql, fields) {
  const r = await fetch(`https://${env.JIRA_BASE_URL}/rest/api/3/search/jql`, {
    method: 'POST',
    headers: { 'Authorization': `Basic ${env.jiraAuth}`, 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ jql, fields: fields || ['summary'], maxResults: 100 })
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

function buildMessage(perPerson, totalUntouched) {
  const dateLabel = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata'
  });

  const lines = [
    `:moon: *EOD Report — ${dateLabel}*`,
    '',
    `:warning: *Untouched today* — tickets that were on their plate this morning`,
    `but got no comment or status change today.`,
    ''
  ];

  for (const p of perPerson) {
    if (p.error) {
      lines.push(`:warning: *${p.name}* — error: ${p.error}`);
      lines.push('');
      continue;
    }
    const icon = p.untouchedCount > 0 ? ':red_circle:' : ':large_green_circle:';
    lines.push(`${icon} *${p.name}* (${p.untouchedCount} untouched out of ${p.totalP01} P0/P1)${p.untouchedCount === 0 ? ' — all touched :white_check_mark:' : ':'}`);
    if (p.untouchedCount > 0) {
      // Sort by priority then due
      const sorted = p.untouched.sort((a, b) =>
        (PRIORITY_RANK[a.priority] ?? 9) - (PRIORITY_RANK[b.priority] ?? 9)
      );
      for (const t of sorted) {
        const pri = PRIORITY_REMAP[t.priority] || t.priority;
        const due = formatDueWithOverdue(t.duedate);
        lines.push(`• ${t.key} (${pri}) — ${t.summary} — ${due}`);
        lines.push(`  ${t.url}`);
      }
    }
    lines.push('');
  }

  lines.push(`Total today: ${totalUntouched} ticket${totalUntouched === 1 ? '' : 's'} untouched across the team.`);
  lines.push('');
  lines.push(`*What you can do:*`);
  lines.push(`• DM each person to check in`);
  lines.push(`• Escalate to Swadhin if you suspect blockers`);
  lines.push(`• Reassign or change deadline if work is shifting`);
  lines.push('');
  lines.push(`Dashboard: https://lepton-marketing-dashboard.vercel.app`);

  return lines.join('\n');
}

function formatDueWithOverdue(iso) {
  if (!iso) return 'no due date';
  const d = new Date(iso + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today - d) / (1000 * 60 * 60 * 24));
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formatted = `Due ${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
  if (diffDays > 0) return `${formatted} (*${diffDays} day${diffDays === 1 ? '' : 's'} OVERDUE*)`;
  if (diffDays === 0) return `${formatted} (today)`;
  return formatted;
}
