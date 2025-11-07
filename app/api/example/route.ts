import { NextResponse } from 'next/server';
import { z } from 'zod';
import { validateBody } from '@/lib/validateBody';
import fetchWithRetry from '@/lib/fetchWithRetry';
import Sentry from '@/lib/sentry.server';

const BodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = validateBody(BodySchema, body);

    // Example server-side call (replace with your own client wrapper)
    const res = await fetchWithRetry('https://httpbin.org/post', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await res.json();
    return NextResponse.json({ ok: true, upstream: json }, { status: 200 });
  } catch (err: any) {
    Sentry?.captureException?.(err);
    const status = err?.status || 500;
    const message = status === 500 ? 'Internal server error' : err.message;
    return NextResponse.json({ error: message, details: err?.details || undefined }, { status });
  }
}
