// Vercel serverless function: returns aggregated LMR stats as JSON.
// Browser calls this every 30s to update the charts on the dashboard.
// Aggregates: by track (top-level label), by status, by priority.

const TRACK_NAMES = {
  '1': 'Lepton',
  '2': 'GMP',
  '3': 'Network Access',
  '4': 'Smart Market',
  '5': 'TraffiCure',
  '6': 'Rajeev sir',
  '7': 'Umang'
};

const PRIORITY_ORDER = ['Highest', 'High', 'Medium', 'Low', 'Lowest'];

export default async function handler(req, res) {
  const JIRA_EMAIL = (process.env.JIRA_EMAIL || '').trim();
  const JIRA_TOKEN = (process.env.JIRA_TOKEN || '').trim();
  const JIRA_BASE_URL = (process.env.JIRA_BASE_URL || '').trim().replace(/^https?:\/\//, '').replace(/\/$/, '');

  if (!JIRA_EMAIL || !JIRA_TOKEN || !JIRA_BASE_URL) {
    return res.status(500).json({ error: 'Missing Jira env vars' });
  }

  const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString('base64');

  try {
    // Fetch ALL open tickets (statusCategory != Done) with labels/priority/status/assignee.
    // We need all of them to aggregate. Cap at 200 (should be plenty for a 4-person team).
    const allOpen = await fetchAllOpen(JIRA_BASE_URL, auth, 200);

    // Aggregate by track (top-level label number 1-7)
    const byTrack = {};
    for (const k of Object.keys(TRACK_NAMES)) byTrack[k] = 0;
    let unassignedTrack = 0;

    // Aggregate by priority
    const byPriority = {};
    for (const p of PRIORITY_ORDER) byPriority[p] = 0;
    byPriority['None'] = 0;

    // Aggregate by status (specific names)
    const byStatus = {};

    // Aggregate by assignee
    const byAssignee = {};

    for (const issue of allOpen) {
      // Track from top-level label number
      const labels = issue.fields.labels || [];
      const trackLabel = labels.find(l => /^[1-7]$/.test(l));
      if (trackLabel) {
        byTrack[trackLabel] = (byTrack[trackLabel] || 0) + 1;
      } else {
        unassignedTrack++;
      }

      // Priority
      const pname = issue.fields.priority?.name || 'None';
      byPriority[pname] = (byPriority[pname] || 0) + 1;

      // Status
      const sname = issue.fields.status?.name || 'Unknown';
      byStatus[sname] = (byStatus[sname] || 0) + 1;

      // Assignee
      const aname = issue.fields.assignee?.displayName || 'Unassigned';
      byAssignee[aname] = (byAssignee[aname] || 0) + 1;
    }

    res.setHeader('Cache-Control', 's-maxage=20, stale-while-revalidate=30');
    res.status(200).json({
      fetchedAt: new Date().toISOString(),
      totalOpen: allOpen.length,
      byTrack: Object.entries(byTrack).map(([k, v]) => ({
        track: k,
        name: TRACK_NAMES[k] || k,
        count: v
      })).sort((a, b) => Number(a.track) - Number(b.track)),
      unassignedTrack,
      byPriority: PRIORITY_ORDER
        .concat(['None'])
        .filter(p => byPriority[p] > 0)
        .map(p => ({ priority: p, count: byPriority[p] })),
      byStatus: Object.entries(byStatus).map(([k, v]) => ({ status: k, count: v }))
        .sort((a, b) => b.count - a.count),
      byAssignee: Object.entries(byAssignee).map(([k, v]) => ({ assignee: k, count: v }))
        .sort((a, b) => b.count - a.count)
    });
  } catch (err) {
    res.status(500).json({ error: 'Fetch failed', detail: String(err) });
  }
}

async function fetchAllOpen(baseUrl, auth, maxResults) {
  const r = await fetch(`https://${baseUrl}/rest/api/3/search/jql`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jql: 'project = LMR AND statusCategory != Done ORDER BY priority DESC',
      fields: ['priority', 'status', 'labels', 'assignee'],
      maxResults
    })
  });
  if (!r.ok) {
    const t = await r.text();
    throw new Error(`Jira ${r.status}: ${t.slice(0, 200)}`);
  }
  const data = await r.json();
  return data.issues || [];
}
