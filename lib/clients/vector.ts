import fetchWithRetry from '../fetchWithRetry';

const VECTOR_PROVIDER = process.env.VECTOR_PROVIDER ?? 'pinecone';
const PINECONE_BASE = process.env.PINECONE_BASE;
const PINECONE_KEY = process.env.PINECONE_API_KEY;

export async function vectorFetch(path: string, opts: RequestInit = {}) {
  if (VECTOR_PROVIDER === 'pinecone') {
    if (!PINECONE_KEY || !PINECONE_BASE) throw new Error('Pinecone credentials missing');
    const url = `${PINECONE_BASE}${path.startsWith('/') ? path : `/${path}`}`;
    const headers = { 'Api-Key': PINECONE_KEY, 'Content-Type': 'application/json', ...(opts && (opts as any).headers) };
    const res = await fetchWithRetry(url, { ...opts, headers, timeoutMs: 12000 });
    const text = await res.text();
    try { return { status: res.status, data: text ? JSON.parse(text) : null }; } catch { return { status: res.status, data: text }; }
  }
  throw new Error('Unsupported vector provider or missing config');
}
