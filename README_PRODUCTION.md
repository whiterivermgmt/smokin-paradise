# Production Hardening Checklist (deliverable)

- Ensure .env.local contains real secrets and is NOT committed.
- Use Vercel/Netlify secret manager to set production env variables.
- Replace in-memory rate limiter with Upstash/Redis for multi-instance.
- Run `npm audit` and fix critical vulnerabilities.
- Configure Sentry and set SENTRY_DSN in production.
- Ensure payment flows use tokenization and PCI-compliant providers (Vector/Stripe SDKs).
- Run Lighthouse & axe audits, fix critical performance & accessibility issues.
