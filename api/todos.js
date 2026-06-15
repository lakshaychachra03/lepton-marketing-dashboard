// Vercel serverless function: returns the Team To-Dos board as JSON.
// The dashboard fetches /api/todos to show each person's live to-dos.
// Data is written by the Slack bot (api/slack-bot.js) into Upstash Redis.
//
// If the database isn't connected yet, returns an empty board with
// configured:false so the dashboard can fall back to the static todos-data.js.

import { getTodos, redisConfigured } from '../lib/redis.js';

export default async function handler(req, res) {
  const empty = { swadhin: [], lakshay: [], chetna: [], plash: [] };

  if (!redisConfigured()) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ ok: false, configured: false, todos: empty });
  }

  try {
    const todos = await getTodos();
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ ok: true, configured: true, todos });
  } catch (err) {
    return res.status(500).json({ ok: false, configured: true, error: String(err), todos: empty });
  }
}
