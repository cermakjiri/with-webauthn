// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { env } from '@workspace/common/client/env';
import { initSentryForServer } from '@workspace/sentry/server';

if (env.NEXT_PUBLIC_DEV_SENTRY_DISABLED !== 'true' && env.NEXT_PUBLIC_SENTRY_DSN) {
    initSentryForServer(env.NEXT_PUBLIC_SENTRY_DSN);
}
