export type FetchOptions = RequestInit & { timeoutMs?: number }

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export default async function fetchWithRetry(
  url: string,
  opts: FetchOptions = {},
  retries = 3,
): Promise<Response> {
  const timeoutMs = opts.timeoutMs ?? 10000;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...opts, signal: controller.signal });
      clearTimeout(timer);
      if (res.ok) return res;
      if (res.status >= 400 && res.status < 500) return res;
      throw new Error(`Upstream status ${res.status}`);
    } catch (err) {
      clearTimeout(timer);
      if (attempt === retries) throw err;
      const backoff = Math.min(1000 * 2 ** attempt, 10000);
      const jitter = Math.floor(Math.random() * 300);
      await sleep(backoff + jitter);
    }
  }
  throw new Error('fetchWithRetry: exhausted retries');
}
