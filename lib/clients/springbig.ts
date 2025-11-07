import fetchWithRetry from '../fetchWithRetry';

const API_BASE = process.env.SPRINGBIG_API_BASE ?? 'https://api.springbig.com';
const API_KEY = process.env.SPRINGBIG_API_KEY;

if (process.env.NODE_ENV !== 'production' && !API_KEY) {
  console.warn('SPRINGBIG_API_KEY not set in environment. Ensure it is set on your host (Vercel, etc.).');
}

export async function springbigFetch(path: string, opts: RequestInit = {}) {
  if (!API_KEY) throw new Error('Missing SpringBig API key on server');
  const upstream = `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    ...((opts && (opts as any).headers) || {}),
  };

  const res = await fetchWithRetry(upstream, { ...opts, headers, timeoutMs: 10000 });
  const text = await res.text();
  try { return { status: res.status, data: text ? JSON.parse(text) : null }; } catch { return { status: res.status, data: text }; }
}
