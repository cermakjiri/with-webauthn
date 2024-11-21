// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { env } from '@workspace/common/client/env';
import { initSentryForEdge } from '@workspace/sentry/edge';

if (env.NEXT_PUBLIC_DEV_SENTRY_DISABLED !== 'true' && env.NEXT_PUBLIC_SENTRY_DSN) {
    initSentryForEdge(env.NEXT_PUBLIC_SENTRY_DSN);
}