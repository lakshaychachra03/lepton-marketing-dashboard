// =============================================================================
//  Shared Upstash Redis (REST) helpers for the Team To-Dos board.
//  NOT a serverless function (it lives outside /api), so it doesn't count
//  toward the Vercel function limit. Imported by api/todos.js and api/slack-bot.js.
//
//  Env vars are set automatically when you add the Upstash/KV integration in
//  Vercel. We accept either naming scheme so it "just works".
// =============================================================================

function env() {
  return {
    url: (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_REST_URL || '').trim(),
    token: (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || process.env.REDIS_REST_TOKEN || '').trim()
  };
}

export function redisConfigured() {
  const { url, token } = env();
  return !!(url && token);
}

// Run one Redis command via the Upstash REST API, e.g. redisCmd(['GET', 'key']).
export async function redisCmd(args) {
  const { url, token } = env();
  if (!url || !token) throw new Error('Redis env vars not set');
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args)
  });
  if (!r.ok) throw new Error('Redis HTTP ' + r.status);
  const j = await r.json();
  return j.result;
}

const TODOS_KEY = 'lmr:todos';
const EMPTY = { swadhin: [], lakshay: [], chetna: [], plash: [] };

// Read the whole board: { swadhin:[...], lakshay:[...], chetna:[...], plash:[...] }
export async function getTodos() {
  try {
    const v = await redisCmd(['GET', TODOS_KEY]);
    if (!v) return { ...EMPTY };
    const o = typeof v === 'string' ? JSON.parse(v) : v;
    return Object.assign({}, EMPTY, o);
  } catch (e) {
    return { ...EMPTY };
  }
}

// Save the whole board back.
export async function saveTodos(obj) {
  const clean = Object.assign({}, EMPTY, obj || {});
  await redisCmd(['SET', TODOS_KEY, JSON.stringify(clean)]);
  return clean;
}
