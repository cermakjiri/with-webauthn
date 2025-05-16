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
    poweredByHeader: false,

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
                    key: 'Cross-Origin-Embedder-Policy',
                    value: 'require-corp',
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
                {
                    key: 'Content-Security-Policy',
                    value: [
                        `default-src 'self'`,
                        `connect-src 'self' https://*.googleapis.com ${new URL(process.env.NEXT_PUBLIC_SENTRY_REPORT_URI!).origin}`,
                        `img-src 'self' https://www.google.com/images/cleardot.gif data:`,
                        `object-src 'none'`,
                        `frame-ancestors 'none'`,
                        `style-src 'self' 'unsafe-inline'`,
                        `worker-src 'self' blob:`,

                        // For local server only:
                        ...(process.env.NODE_ENV === 'development'
                            ? [
                                  `script-src 'self' blob: 'unsafe-eval'`,
                                  `style-src 'self' 'unsafe-inline'`,
                                  `style-src-elem 'self' 'unsafe-inline'`,
                              ]
                            : []),

                        'upgrade-insecure-requests',

                        `report-uri ${process.env.NEXT_PUBLIC_SENTRY_REPORT_URI}`,
                        'report-to csp-endpoint',
                    ]
                        .filter(Boolean)
                        .join('; '),
                },
                {
                    key: 'Report-To',
                    value: `Report-To: ${JSON.stringify({
                        group: 'csp-endpoint',
                        max_age: 10886400,
                        endpoints: [
                            {
                                url: `${process.env.NEXT_PUBLIC_SENTRY_REPORT_URI}`,
                            },
                        ],
                        include_subdomains: true,
                    })}`,
                },
                {
                    key: 'Reporting-Endpoints',
                    value: `csp-endpoint="${process.env.NEXT_PUBLIC_SENTRY_REPORT_URI}"`,
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
