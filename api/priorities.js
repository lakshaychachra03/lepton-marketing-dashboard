// Vercel serverless function: returns top-priority LMR tickets as JSON.
// Browser calls this every 30 seconds. Jira credentials live in env vars,
// never reach the browser.

const JQL = 'project = LMR AND priority in (Highest, High) AND statusCategory != Done AND duedate is not EMPTY ORDER BY duedate ASC, priority DESC';

export default async function handler(req, res) {
  // Trim env vars defensively — copy-paste into Vercel often picks up whitespace.
  const JIRA_EMAIL = (process.env.JIRA_EMAIL || '').trim();
  const JIRA_TOKEN = (process.env.JIRA_TOKEN || '').trim();
  const JIRA_BASE_URL = (process.env.JIRA_BASE_URL || '').trim().replace(/^https?:\/\//, '').replace(/\/$/, '');

  if (!JIRA_EMAIL || !JIRA_TOKEN || !JIRA_BASE_URL) {
    return res.status(500).json({
      error: 'Missing env vars. Set JIRA_EMAIL, JIRA_TOKEN, JIRA_BASE_URL in Vercel.'
    });
  }

  const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString('base64');
  // New Jira Cloud endpoint (POST) — old GET /rest/api/3/search returns 410.
  // See: https://developer.atlassian.com/changelog/#CHANGE-2046
  const url = `https://${JIRA_BASE_URL}/rest/api/3/search/jql`;

  try {
    const jiraRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jql: JQL,
        fields: ['summary', 'priority', 'assignee', 'duedate', 'status'],
        maxResults: 20
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
      assignee: issue.fields.assignee?.displayName || 'Unassigned',
      duedate: issue.fields.duedate,
      status: issue.fields.status?.name || 'Unknown',
      url: `https://${JIRA_BASE_URL}/browse/${issue.key}`
    }));

    res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=30');
    res.status(200).json({
      fetchedAt: new Date().toISOString(),
      count: issues.length,
      issues
    });
  } catch (err) {
    res.status(500).json({ error: 'Fetch failed', detail: String(err) });
  }
}
