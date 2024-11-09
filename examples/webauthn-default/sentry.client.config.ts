// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { env } from '@workspace/common/client/env';
import { initSentryForClient } from '@workspace/sentry/client';

if (env.NEXT_PUBLIC_DEV_SENTRY_DISABLED !== 'true' && env.NEXT_PUBLIC_SENTRY_DSN) {
    initSentryForClient(env.NEXT_PUBLIC_SENTRY_DSN);
}
