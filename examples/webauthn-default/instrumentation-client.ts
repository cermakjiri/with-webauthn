// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { captureRouterTransitionStart } from '@sentry/nextjs';

import { env } from '@workspace/common/client/env';
import { logger } from '@workspace/common/logger';
import { initSentryForClient } from '@workspace/sentry/client';

if (env.NEXT_PUBLIC_DEV_SENTRY_DISABLED !== 'true' && env.NEXT_PUBLIC_SENTRY_DSN) {
    logger.debug('Sentry: Initializing Sentry for client');
    initSentryForClient(env.NEXT_PUBLIC_SENTRY_DSN);
}

export const onRouterTransitionStart =
    env.NEXT_PUBLIC_DEV_SENTRY_DISABLED !== 'true' && env.NEXT_PUBLIC_SENTRY_DSN
        ? captureRouterTransitionStart
        : () => {};
