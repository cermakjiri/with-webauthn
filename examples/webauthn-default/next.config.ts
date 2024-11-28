import type { NextConfig } from 'next';
import { config } from 'dotenv';
import type { dependencies } from 'package.json';

import { withDefinedSentryConfig } from '@workspace/sentry/next-config';

if (process.env.NODE_ENV === 'development') {
    config({ path: '.env.local' });
    config({ path: '../../.env' });
}

type Dependency = keyof typeof dependencies;

const nextConfig: NextConfig = {
    reactStrictMode: true,

    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
    },

    transpilePackages: ['@workspace/common'] satisfies Dependency[],

    redirects: async () => [],
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
export default process.env.NEXT_PUBLIC_DEV_SENTRY_DISABLED === 'true'
    ? nextConfig
    : withDefinedSentryConfig(nextConfig);
