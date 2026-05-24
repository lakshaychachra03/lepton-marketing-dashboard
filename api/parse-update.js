// Vercel serverless function: parses bulk-update text and adds Jira comments.
//
// POST body (JSON or form-urlencoded):
//   { "text": "update:\nLMR-83: finished cutover\nLMR-84: blocked", "author": "Lakshay" }
//
// Auth: must include ?token=YOUR_TOKEN (matches UPDATE_TOKEN env var).
//
// Response (JSON):
//   { ok: true, processed: [{ key, status, ... }], errors: [...] }

const TICKET_LINE = /^\s*(?:[-*•]\s*)?(LMR[-_ ]?\d+)\s*[:|\-—]\s*(.+?)\s*$/im;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }

  const expectedToken = (process.env.UPDATE_TOKEN || '').trim();
  const providedToken = (req.query.token || '').toString().trim();
  if (!expectedToken || providedToken !== expectedToken) {
    return res.status(401).json({ error: 'Invalid or missing token' });
  }

  // Body could be JSON or form-urlencoded
  let text = '';
  let author = '';
  try {
    const ct = (req.headers['content-type'] || '').toLowerCase();
    if (ct.includes('application/json')) {
      const body = typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
      text = String(body.text || '');
      author = String(body.author || '').trim();
    } else if (ct.includes('application/x-www-form-urlencoded')) {
      // Vercel auto-parses form data into req.body
      text = String((req.body && req.body.text) || '');
      author = String((req.body && req.body.author) || '').trim();
    } else {
      // Try query string fallback
      text = String(req.query.text || '');
      author = String(req.query.author || '').trim();
    }
  } catch (e) {
    return res.status(400).json({ error: 'Cannot parse body', detail: String(e) });
  }

  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  // Parse text into ticket → update map
  const lines = text.split(/\r?\n/);
  const updates = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    // skip the "update:" header line
    if (/^update\s*:?\s*$/i.test(line)) continue;
    const m = line.match(TICKET_LINE);
    if (m) {
      const key = m[1].replace(/[_ ]/g, '-').toUpperCase();
      const update = m[2].trim();
      if (update) updates.push({ key, update, raw: line });
    }
  }

  if (updates.length === 0) {
    return res.status(400).json({
      error: 'No valid update lines found. Format: "LMR-83: your update text" on each line.',
      receivedText: text.slice(0, 500)
    });
  }

  const JIRA_EMAIL = (process.env.JIRA_EMAIL || '').trim();
  const JIRA_TOKEN = (process.env.JIRA_TOKEN || '').trim();
  const JIRA_BASE_URL = (process.env.JIRA_BASE_URL || '').trim().replace(/^https?:\/\//, '').replace(/\/$/, '');

  if (!JIRA_EMAIL || !JIRA_TOKEN || !JIRA_BASE_URL) {
    return res.status(500).json({ error: 'Missing Jira env vars' });
  }

  const jiraAuth = Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString('base64');
  const authorTag = author ? ` (via Slack by ${author})` : ' (via Slack)';
  const processed = [];

  for (const u of updates) {
    try {
      // Use Jira REST API v3 with ADF body
      const r = await fetch(`https://${JIRA_BASE_URL}/rest/api/3/issue/${u.key}/comment`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${jiraAuth}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          body: {
            type: 'doc',
            version: 1,
            content: [{
              type: 'paragraph',
              content: [{ type: 'text', text: u.update + authorTag }]
            }]
          }
        })
      });
      if (r.ok) {
        processed.push({ key: u.key, ok: true, update: u.update });
      } else {
        const t = await r.text();
        processed.push({ key: u.key, ok: false, status: r.status, error: t.slice(0, 200) });
      }
    } catch (e) {
      processed.push({ key: u.key, ok: false, error: String(e) });
    }
  }

  const successCount = processed.filter(p => p.ok).length;
  const failCount = processed.length - successCount;

  res.status(200).json({
    ok: failCount === 0,
    summary: `Posted ${successCount}/${processed.length} updates to Jira.`,
    processed,
    receivedAt: new Date().toISOString()
  });
}
