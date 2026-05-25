// Vercel serverless function: returns all LMR tickets with a due date in a range.
// Browser calls /api/calendar?start=YYYY-MM-DD&end=YYYY-MM-DD
// Includes Done tickets (calendar shows them dimmed). Tickets without a duedate
// are filtered out by JQL.

export default async function handler(req, res) {
  const JIRA_EMAIL = (process.env.JIRA_EMAIL || '').trim();
  const JIRA_TOKEN = (process.env.JIRA_TOKEN || '').trim();
  const JIRA_BASE_URL = (process.env.JIRA_BASE_URL || '').trim().replace(/^https?:\/\//, '').replace(/\/$/, '');

  if (!JIRA_EMAIL || !JIRA_TOKEN || !JIRA_BASE_URL) {
    return res.status(500).json({
      error: 'Missing env vars. Set JIRA_EMAIL, JIRA_TOKEN, JIRA_BASE_URL in Vercel.'
    });
  }

  const start = String(req.query.start || '').trim();
  const end = String(req.query.end || '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || !/^\d{4}-\d{2}-\d{2}$/.test(end)) {
    return res.status(400).json({ error: 'Provide start and end as YYYY-MM-DD.' });
  }

  const jql = `project = LMR AND duedate >= "${start}" AND duedate <= "${end}" ORDER BY duedate ASC, priority DESC`;
  const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString('base64');

  try {
    const issues = [];
    let nextPageToken;
    let safety = 0;

    do {
      const body = {
        jql,
        fields: ['summary', 'priority', 'assignee', 'duedate', 'status', 'labels', 'parent', 'issuetype'],
        maxResults: 100
      };
      if (nextPageToken) body.nextPageToken = nextPageToken;

      const jiraRes = await fetch(`https://${JIRA_BASE_URL}/rest/api/3/search/jql`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!jiraRes.ok) {
        const text = await jiraRes.text();
        return res.status(jiraRes.status).json({
          error: `Jira API ${jiraRes.status}`,
          detail: text.slice(0, 500)
        });
      }

      const data = await jiraRes.json();
      (data.issues || []).forEach(issue => {
        const labels = issue.fields.labels || [];
        let track = null;
        for (const l of labels) {
          const m = String(l).match(/^(\d+)(?:$|\.)/);
          if (m) { track = parseInt(m[1], 10); break; }
        }

        // Epic detection. In team-managed projects, parent IS the epic. In
        // company-managed, parent might be a Story; we still surface it if no
        // explicit epic is set. If the issue itself is an Epic, group it under
        // its own title.
        const issuetypeName = issue.fields.issuetype?.name || '';
        const parent = issue.fields.parent;
        let epicKey = null;
        let epicSummary = null;
        if (issuetypeName === 'Epic') {
          epicKey = issue.key;
          epicSummary = issue.fields.summary;
        } else if (parent) {
          epicKey = parent.key || null;
          epicSummary = parent.fields?.summary || null;
        }

        issues.push({
          key: issue.key,
          summary: issue.fields.summary,
          priority: issue.fields.priority?.name || 'None',
          assignee: issue.fields.assignee?.displayName || 'Unassigned',
          duedate: issue.fields.duedate,
          status: issue.fields.status?.name || 'Unknown',
          done: issue.fields.status?.statusCategory?.key === 'done',
          issuetype: issuetypeName,
          epicKey,
          epicSummary,
          track,
          url: `https://${JIRA_BASE_URL}/browse/${issue.key}`
        });
      });

      nextPageToken = data.nextPageToken;
      safety++;
    } while (nextPageToken && safety < 10);

    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
    res.status(200).json({
      fetchedAt: new Date().toISOString(),
      start,
      end,
      count: issues.length,
      issues
    });
  } catch (err) {
    res.status(500).json({ error: 'Fetch failed', detail: String(err) });
  }
}
