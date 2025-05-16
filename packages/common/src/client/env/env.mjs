import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    shared: {
        NEXT_PUBLIC_CLIENT_ORIGIN: z.string().url(),
        NEXT_PUBLIC_DEV_SENTRY_DISABLED: z.enum(['true', 'false']).optional(),
        NEXT_PUBLIC_SENTRY_DSN: process.env.NODE_ENV === 'development' ? z.string().optional() : z.string(),
    },

    client: {
        NEXT_PUBLIC_NODE_ENV: z.enum(['development', 'production', 'test']),
        NEXT_PUBLIC_DEV_RETRY_QUERIES: z.enum(['true', 'false']).optional(),

        // Firebase
        NEXT_PUBLIC_FIREBASE_API_KEY: z.string(),
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string(),
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string(),
        NEXT_PUBLIC_FIREBASE_APP_ID: z.string(),

        NEXT_PUBLIC_FIREBASE_DB_ID: z.string().optional(),

        NEXT_PUBLIC_DEFAULT_EXAMPLE_ORIGIN: z.string().url(),
        NEXT_PUBLIC_UPGRADE_EXAMPLE_ORIGIN: z.string().url(),
    },

    /**
     * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
     */
    runtimeEnv: {
        NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_CLIENT_ORIGIN: process.env.NEXT_PUBLIC_CLIENT_ORIGIN,
        NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,

        // Firebase
        NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

        NEXT_PUBLIC_FIREBASE_DB_ID: process.env.NEXT_PUBLIC_FIREBASE_DB_ID,

        // Dev
        NEXT_PUBLIC_DEV_RETRY_QUERIES: process.env.NEXT_PUBLIC_DEV_RETRY_QUERIES,
        NEXT_PUBLIC_DEV_SENTRY_DISABLED: process.env.NEXT_PUBLIC_DEV_SENTRY_DISABLED,

        // Example origins
        NEXT_PUBLIC_DEFAULT_EXAMPLE_ORIGIN: process.env.NEXT_PUBLIC_DEFAULT_EXAMPLE_ORIGIN,
        NEXT_PUBLIC_UPGRADE_EXAMPLE_ORIGIN: process.env.NEXT_PUBLIC_UPGRADE_EXAMPLE_ORIGIN,
    },

    skipValidation: !!process.env.SKIP_ENV_VALIDATION || process.env.npm_lifecycle_event === 'lint',
});
