// app/api/springbig/route.ts
import { NextResponse } from 'next/server';
import { springbigFetch } from '@/lib/clients/springbig';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const upstreamPath = url.pathname.replace('/api/springbig', '') || '/';
  try {
    const result = await springbigFetch(upstreamPath, { method: 'GET' });
    return NextResponse.json(result.data, { status: result.status });
  } catch (err) {
    console.error('App-router springbig GET error', err);
    return NextResponse.json({ error: 'Upstream failed' }, { status: 502 });
  }
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const upstreamPath = url.pathname.replace('/api/springbig', '') || '/';
  const body = await request.json();
  try {
    const result = await springbigFetch(upstreamPath, { method: 'POST', body: JSON.stringify(body) });
    return NextResponse.json(result.data, { status: result.status });
  } catch (err) {
    console.error('App-router springbig POST error', err);
    return NextResponse.json({ error: 'Upstream failed' }, { status: 502 });
  }
}
