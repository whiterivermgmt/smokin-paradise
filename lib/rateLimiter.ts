// NOTE: For production with multiple instances, replace this with Upstash/Redis-backed limiter.
type TokenBucket = { tokens: number; last: number };
const buckets = new Map<string, TokenBucket>();

export function allowRequest(key = 'global', capacity = 30, refillRate = 1): boolean {
  const now = Date.now() / 1000;
  const bucket = buckets.get(key) ?? { tokens: capacity, last: now };
  const elapsed = Math.max(0, now - bucket.last);
  const refill = elapsed * refillRate;
  bucket.tokens = Math.min(capacity, bucket.tokens + refill);
  bucket.last = now;
  if (bucket.tokens >= 1) { bucket.tokens -= 1; buckets.set(key, bucket); return true; }
  buckets.set(key, bucket);
  return false;
}
