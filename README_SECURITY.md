# Security & Deployment Checklist

This file documents the immediate hardening steps and instructions for securely operating this Next.js app.

## Immediate (apply before demo / production)
1. **Remove & rotate secrets**
   - Remove any `.env*` left in repository.
   - Rotate API keys in provider portals (SpringBig, Cova, Pinecone, Sentry).
   - Add new keys to host secret manager (Vercel/Netlify/Heroku/AWS Secrets Manager).

2. **Store keys in host secrets**
   - Vercel: `vercel env add SPRINGBIG_API_KEY`
   - Example env names:
     - SPRINGBIG_API_KEY
     - SPRINGBIG_API_BASE
     - COVA_API_KEY
     - COVA_API_BASE
     - PINECONE_API_KEY
     - PINECONE_BASE
     - SENTRY_DSN

3. **Run dependency audit**
   - `npm ci && npm audit fix --force` (review changes)

4. **Deploy to staging**
   - Test API proxies, check logs for 401/403, and ensure nothing leaks keys.

## Production hardening
- Enable Sentry or equivalent for error monitoring.
- Configure Redis-backed rate limiter for API routes.
- Configure alerting and observability (Sentry + Datadog/LogDNA).
- Add automatic secret rotation policy in provider consoles.

## Dev notes
- All provider calls must go through server-side wrappers in `lib/clients/`.
- Avoid direct browser calls using provider keys.
- Respect `prefers-reduced-motion` for animations.

## Contacts
- For security incidents: rotate keys immediately and revoke tokens in provider consoles.
