import fetchWithRetry from '../fetchWithRetry';

const API_BASE = process.env.COVA_API_BASE ?? 'https://api.covasoftware.com';
const API_KEY = process.env.COVA_API_KEY;

if (process.env.NODE_ENV !== 'production' && !API_KEY) {
  console.warn('COVA_API_KEY missing from environment (server).');
}

export async function covaFetch(path: string, opts: RequestInit = {}) {
  if (!API_KEY) throw new Error('Missing Cova API key on server');
  const url = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
  const headers = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json', ...((opts && (opts as any).headers) || {}) };
  const res = await fetchWithRetry(url, { ...opts, headers, timeoutMs: 12000 });
  const text = await res.text();
  try { return { status: res.status, data: text ? JSON.parse(text) : null }; } catch { return { status: res.status, data: text }; }
}
