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

    headers: async () => [
        {
            source: '/:path*',
            headers: [
                {
                    key: 'X-Frame-Options',
                    value: 'DENY',
                },
                {
                    key: 'Upgrade-Insecure-Requests',
                    value: '1',
                },
                {
                    key: 'Permissions-Policy',
                    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), midi=(), magnetometer=(), gyroscope=(), fullscreen=()',
                },
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff',
                },
                {
                    key: 'Referrer-Policy',
                    value: 'no-referrer',
                },
                {
                    key: 'Strict-Transport-Security',
                    value: 'max-age=63072000; includeSubDomains; preload',
                },
                {
                    key: 'Access-Control-Allow-Origin',
                    value: process.env.NEXT_PUBLIC_CLIENT_ORIGIN!,
                },
            ],
        },
    ],
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
export default process.env.NEXT_PUBLIC_DEV_SENTRY_DISABLED === 'true'
    ? nextConfig
    : withDefinedSentryConfig(nextConfig);
