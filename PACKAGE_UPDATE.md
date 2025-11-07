# Package.json - Recommended changes (apply to your package.json)

1) Add these scripts:
  "build": "next build",
  "start": "NODE_ENV=production next start",
  "lint": "next lint",
  "audit": "npm audit --production --audit-level=high"

2) Recommended dependencies (install in your repo):
  npm install zod @sentry/node p-retry @upstash/ratelimit --save

3) Dev-dependencies:
  npm install -D eslint jest @types/jest
