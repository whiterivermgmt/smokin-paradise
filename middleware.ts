import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Enforce HTTPS (behind proxies / platforms this may already be done)
  const proto = req.headers.get('x-forwarded-proto') || req.nextUrl.protocol;
  if (proto === 'http:') {
    const url = req.nextUrl.clone();
    url.protocol = 'https:';
    return NextResponse.redirect(url);
  }

  const res = NextResponse.next();

  // Security headers (extra to next.config)
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'no-referrer-when-downgrade');
  res.headers.set('Permissions-Policy', 'geolocation=(), microphone=()');

  return res;
}

export const config = {
  matcher: ['/api/:path*', '/(.*)'],
};
