// Vercel serverless function: read + write the Team To-Dos board.
//
// GET  /api/todos
//   -> { ok, configured, pinsSet, todos }
//
// POST /api/todos   (JSON body, action-based)
//   { action:'setup',  pins:{swadhin,lakshay,chetna,plash} }   one-time: set passcodes
//   { action:'verify', person, pin }                            check a passcode
//   { action:'save',   person, pin, todos:[...] }               save a person's list
//
// Rules: a person's own passcode edits their own list. Lakshay's passcode edits
// anyone's. Passcodes are stored in the (private) database, never exposed via GET.

import { getTodos, saveTodos, getPins, savePins, redisConfigured } from '../lib/redis.js';

const PEOPLE = ['swadhin', 'lakshay', 'chetna', 'plash'];
const EMPTY = { swadhin: [], lakshay: [], chetna: [], plash: [] };

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  try { return JSON.parse(req.body || '{}'); } catch (e) { return {}; }
}

// Keep stored to-dos to a known, safe shape.
function cleanList(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.slice(0, 100).map(function (t) {
    return {
      title: String(t.title || '').slice(0, 300),
      status: ['todo', 'prog', 'done'].indexOf(t.status) >= 0 ? t.status : 'todo',
      due: typeof t.due === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(t.due) ? t.due : '',
      jira: String(t.jira || '').slice(0, 20),
      comments: Array.isArray(t.comments) ? t.comments.slice(0, 50).map(function (c) {
        return { t: String(c.t || '').slice(0, 500), by: String(c.by || '').slice(0, 40), when: String(c.when || '').slice(0, 40) };
      }) : []
    };
  });
}

export default async function handler(req, res) {
  if (!redisConfigured()) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ ok: false, configured: false, pinsSet: false, todos: EMPTY });
  }

  // ---- READ ----
  if (req.method === 'GET') {
    try {
      const todos = await getTodos();
      const pins = await getPins();
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json({ ok: true, configured: true, pinsSet: !!pins, todos });
    } catch (err) {
      return res.status(500).json({ ok: false, configured: true, pinsSet: false, error: String(err), todos: EMPTY });
    }
  }

  // ---- WRITE ----
  if (req.method === 'POST') {
    const body = readBody(req);
    const action = body.action;
    try {
      const pins = await getPins();

      if (action === 'setup') {
        if (pins) return res.status(403).json({ ok: false, error: 'Passcodes are already set up.' });
        const np = body.pins || {};
        for (const p of PEOPLE) {
          if (!np[p] || String(np[p]).trim().length < 3) {
            return res.status(400).json({ ok: false, error: 'Each passcode must be at least 3 characters.' });
          }
        }
        await savePins({
          swadhin: String(np.swadhin).trim(),
          lakshay: String(np.lakshay).trim(),
          chetna: String(np.chetna).trim(),
          plash: String(np.plash).trim()
        });
        return res.status(200).json({ ok: true });
      }

      if (!pins) return res.status(403).json({ ok: false, error: 'Editing is not set up yet.' });

      const person = body.person;
      const pin = String(body.pin || '').trim();
      if (PEOPLE.indexOf(person) < 0) return res.status(400).json({ ok: false, error: 'Unknown person.' });
      const isAdmin = !!pin && pin === pins.lakshay;
      const allowed = !!pin && (pin === pins[person] || isAdmin);

      if (action === 'verify') {
        return res.status(200).json({ ok: allowed, admin: isAdmin });
      }

      if (action === 'save') {
        if (!allowed) return res.status(401).json({ ok: false, error: 'Wrong passcode.' });
        const date = String(body.date || '').trim();
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return res.status(400).json({ ok: false, error: 'Missing or invalid date.' });
        const todos = await getTodos();
        let pm = todos[person];
        if (Array.isArray(pm)) pm = { '2026-06-15': pm };       // migrate legacy flat list
        if (!pm || typeof pm !== 'object') pm = {};
        pm[date] = cleanList(body.todos);
        todos[person] = pm;
        await saveTodos(todos);
        return res.status(200).json({ ok: true, todos });
      }

      return res.status(400).json({ ok: false, error: 'Unknown action.' });
    } catch (err) {
      return res.status(500).json({ ok: false, error: String(err) });
    }
  }

  return res.status(405).json({ ok: false, error: 'Method not allowed.' });
}
