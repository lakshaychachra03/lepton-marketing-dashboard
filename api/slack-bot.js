// Vercel serverless function: Slack Events API handler for Lepton Marketing Bot.
//
// Receives DM messages from team members, parses lines like:
//   LMR-83: finished cutover
//   LMR-84: done
//   LMR-119: in progress, blocked by Plash
// For each line:
//   - "done" or "in progress" / "in-progress" → status transition
//   - anything else → add as a comment to the ticket
// Replies in the same DM with success/failure per ticket.
//
// Required Vercel env vars:
//   SLACK_SIGNING_SECRET  - from Slack app settings
//   SLACK_BOT_TOKEN       - from Slack app OAuth & Permissions (xoxb-...)
//   JIRA_EMAIL, JIRA_TOKEN, JIRA_BASE_URL  - already set

import crypto from 'crypto';

const TICKET_LINE = /^\s*(?:[-*•]\s*)?(LMR[-_ ]?\d+)\s*[:|\-—]\s*(.+?)\s*$/;
const DONE_KEYWORDS = /^(done|complete[d]?|finished|completed|closed|✅)$/i;
const IN_PROGRESS_KEYWORDS = /^(in[\s-]?progress|started|working|wip|🚧)$/i;
const TODO_KEYWORDS = /^(todo|to[\s-]?do|reset|reopen)$/i;

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }

  // Read raw body for signature verification
  const rawBody = await readRawBody(req);
  let body;
  try {
    body = JSON.parse(rawBody);
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  // Handle Slack URL verification challenge (one-time, during app setup)
  if (body.type === 'url_verification') {
    return res.status(200).send(body.challenge);
  }

  // Verify Slack signature
  const signingSecret = (process.env.SLACK_SIGNING_SECRET || '').trim();
  if (signingSecret) {
    const timestamp = req.headers['x-slack-request-timestamp'];
    const signature = req.headers['x-slack-signature'];
    if (!verifySlackSignature(signingSecret, timestamp, rawBody, signature)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
  }

  // Process event synchronously THEN respond.
  // (Vercel serverless kills the function after response is sent,
  // so post-response async work doesn't reliably execute.)
  // Slack tolerates up to 3 sec for ack; our processing is typically <2 sec.
  if (body.type === 'event_callback' && body.event) {
    try {
      await handleEvent(body.event);
    } catch (e) {
      console.error('handleEvent error:', e);
    }
  }

  res.status(200).json({ ok: true });
}

async function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function verifySlackSignature(secret, timestamp, rawBody, signature) {
  if (!timestamp || !signature) return false;
  // Reject requests older than 5 minutes
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - Number(timestamp)) > 60 * 5) return false;
  const sigBase = `v0:${timestamp}:${rawBody}`;
  const expected = 'v0=' + crypto.createHmac('sha256', secret).update(sigBase).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch (e) {
    return false;
  }
}

async function handleEvent(event) {
  // Only handle direct messages (im) with actual text
  if (event.type !== 'message') return;
  if (event.channel_type !== 'im') return;
  // Ignore bot's own messages and edits
  if (event.bot_id) return;
  if (event.subtype) return;
  const text = (event.text || '').trim();
  if (!text) return;

  const botToken = (process.env.SLACK_BOT_TOKEN || '').trim();
  if (!botToken) {
    console.error('SLACK_BOT_TOKEN not set');
    return;
  }

  // Lookup user info (for author tag in Jira comments)
  let authorName = 'someone';
  try {
    const userInfo = await slackApi('users.info', botToken, { user: event.user });
    authorName = userInfo?.user?.real_name || userInfo?.user?.name || 'someone';
  } catch (e) {
    console.error('users.info failed:', e);
  }

  // Parse the message into updates
  const updates = parseUpdates(text);

  if (updates.length === 0) {
    await postReply(botToken, event.channel,
      "I didn't see any `LMR-XX: <update>` lines in your message.\n\n" +
      "Examples:\n" +
      "• `LMR-83: finished cutover, going live tomorrow`\n" +
      "• `LMR-84: done`\n" +
      "• `LMR-119: in progress`\n\n" +
      "Type one ticket per line. Multiple tickets in one message work fine."
    );
    return;
  }

  // Process each update
  const JIRA_EMAIL = (process.env.JIRA_EMAIL || '').trim();
  const JIRA_TOKEN = (process.env.JIRA_TOKEN || '').trim();
  const JIRA_BASE_URL = (process.env.JIRA_BASE_URL || '').trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
  const jiraAuth = Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString('base64');

  const results = [];
  for (const u of updates) {
    if (DONE_KEYWORDS.test(u.text)) {
      const r = await jiraTransition(JIRA_BASE_URL, jiraAuth, u.key, 'Done', authorName);
      results.push({ key: u.key, action: 'mark Done', ok: r.ok, error: r.error });
    } else if (IN_PROGRESS_KEYWORDS.test(u.text)) {
      const r = await jiraTransition(JIRA_BASE_URL, jiraAuth, u.key, 'In Progress', authorName);
      results.push({ key: u.key, action: 'mark In Progress', ok: r.ok, error: r.error });
    } else if (TODO_KEYWORDS.test(u.text)) {
      const r = await jiraTransition(JIRA_BASE_URL, jiraAuth, u.key, 'To Do', authorName);
      results.push({ key: u.key, action: 'mark To Do', ok: r.ok, error: r.error });
    } else {
      const r = await jiraAddComment(JIRA_BASE_URL, jiraAuth, u.key, u.text, authorName);
      results.push({ key: u.key, action: 'comment', ok: r.ok, error: r.error });
    }
  }

  // Build reply
  const okCount = results.filter(r => r.ok).length;
  const lines = [
    `:white_check_mark: Processed ${okCount}/${results.length} update${results.length === 1 ? '' : 's'}:`,
    ''
  ];
  for (const r of results) {
    const icon = r.ok ? ':white_check_mark:' : ':warning:';
    const url = `https://${JIRA_BASE_URL}/browse/${r.key}`;
    if (r.ok) {
      lines.push(`${icon} <${url}|${r.key}> — ${r.action}`);
    } else {
      lines.push(`${icon} ${r.key} — ${r.action} FAILED: ${r.error}`);
    }
  }

  await postReply(botToken, event.channel, lines.join('\n'));
}

function parseUpdates(text) {
  const updates = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    if (/^update\s*:?\s*$/i.test(line)) continue;
    const m = line.match(TICKET_LINE);
    if (m) {
      const key = m[1].replace(/[_ ]/g, '-').toUpperCase();
      const txt = m[2].trim();
      if (txt) updates.push({ key, text: txt });
    }
  }
  return updates;
}

async function slackApi(method, token, body) {
  const r = await fetch(`https://slack.com/api/${method}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(body)
  });
  return r.json();
}

async function postReply(token, channel, text) {
  return slackApi('chat.postMessage', token, { channel, text });
}

async function jiraAddComment(baseUrl, auth, key, text, author) {
  try {
    const r = await fetch(`https://${baseUrl}/rest/api/3/issue/${key}/comment`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: {
          type: 'doc',
          version: 1,
          content: [{
            type: 'paragraph',
            content: [{ type: 'text', text: `${text}\n\n— via Slack from ${author}` }]
          }]
        }
      })
    });
    if (r.ok) return { ok: true };
    const t = await r.text();
    return { ok: false, error: `HTTP ${r.status}: ${t.slice(0, 120)}` };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

async function jiraTransition(baseUrl, auth, key, targetStatus, author) {
  try {
    // Fetch available transitions for this issue
    const tRes = await fetch(`https://${baseUrl}/rest/api/3/issue/${key}/transitions`, {
      headers: { 'Authorization': `Basic ${auth}`, 'Accept': 'application/json' }
    });
    if (!tRes.ok) return { ok: false, error: `transitions HTTP ${tRes.status}` };
    const tData = await tRes.json();
    const match = (tData.transitions || []).find(t =>
      t.name.toLowerCase() === targetStatus.toLowerCase()
    );
    if (!match) {
      return { ok: false, error: `no '${targetStatus}' transition available` };
    }
    // Execute the transition
    const r = await fetch(`https://${baseUrl}/rest/api/3/issue/${key}/transitions`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ transition: { id: match.id } })
    });
    if (r.ok || r.status === 204) {
      // Also add a comment noting who did this from Slack
      await jiraAddComment(baseUrl, auth, key, `Marked ${targetStatus}`, author);
      return { ok: true };
    }
    const t = await r.text();
    return { ok: false, error: `HTTP ${r.status}: ${t.slice(0, 120)}` };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
