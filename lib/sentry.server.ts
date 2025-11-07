import * as Sentry from '@sentry/node';
const DSN = process.env.SENTRY_DSN;
if (DSN) {
  Sentry.init({ dsn: DSN, environment: process.env.NODE_ENV ?? 'development', tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE) || 0.05 });
} else {
  // no-op in local dev if unset
  console.warn('SENTRY_DSN not provided; Sentry disabled.');
}
export default Sentry;
