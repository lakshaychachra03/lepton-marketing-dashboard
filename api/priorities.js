// Vercel serverless function: returns top-priority LMR tickets as JSON.
// Browser calls this every 30 seconds with ?level=p0|p1|p2|p3|p4
// (defaults to p0 if missing). Token stays server-side.

const LEVEL_TO_JIRA = {
  p0: 'Highest',
  p1: 'High',
  p2: 'Medium',
  p3: 'Low',
  p4: 'Lowest'
};

export default async function handler(req, res) {
  const JIRA_EMAIL = (process.env.JIRA_EMAIL || '').trim();
  const JIRA_TOKEN = (process.env.JIRA_TOKEN || '').trim();
  const JIRA_BASE_URL = (process.env.JIRA_BASE_URL || '').trim().replace(/^https?:\/\//, '').replace(/\/$/, '');

  if (!JIRA_EMAIL || !JIRA_TOKEN || !JIRA_BASE_URL) {
    return res.status(500).json({
      error: 'Missing env vars. Set JIRA_EMAIL, JIRA_TOKEN, JIRA_BASE_URL in Vercel.'
    });
  }

  const level = String(req.query.level || 'p0').toLowerCase();
  const jiraPriority = LEVEL_TO_JIRA[level];
  if (!jiraPriority) {
    return res.status(400).json({ error: 'Invalid level. Use p0, p1, p2, p3, or p4.' });
  }

  // JQL puts nulls last by default for ASC sort
  const jql = `project = LMR AND priority = "${jiraPriority}" AND statusCategory != Done ORDER BY duedate ASC, updated DESC`;

  const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString('base64');

  try {
    const jiraRes = await fetch(`https://${JIRA_BASE_URL}/rest/api/3/search/jql`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jql,
        fields: ['summary', 'priority', 'assignee', 'duedate', 'status'],
        maxResults: 50
      })
    });

    if (!jiraRes.ok) {
      const text = await jiraRes.text();
      return res.status(jiraRes.status).json({
        error: `Jira API ${jiraRes.status}`,
        detail: text.slice(0, 500)
      });
    }

    const data = await jiraRes.json();
    const issues = (data.issues || []).map(issue => ({
      key: issue.key,
      summary: issue.fields.summary,
      priority: issue.fields.priority?.name || 'None',
      level,
      assignee: issue.fields.assignee?.displayName || 'Unassigned',
      duedate: issue.fields.duedate,
      status: issue.fields.status?.name || 'Unknown',
      url: `https://${JIRA_BASE_URL}/browse/${issue.key}`
    }));

    res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=30');
    res.status(200).json({
      fetchedAt: new Date().toISOString(),
      level,
      jiraPriority,
      count: issues.length,
      issues
    });
  } catch (err) {
    res.status(500).json({ error: 'Fetch failed', detail: String(err) });
  }
}
