import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';
import { config } from 'dotenv';
import type { dependencies } from 'package.json';

if (process.env.NODE_ENV === 'development') {
    config({
        path: '.env.local',
    });
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
    : withSentryConfig(nextConfig, {
          // For all available options, see:
          // https://github.com/getsentry/sentry-webpack-plugin#options

          org: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,

          // Only print logs for uploading source maps in CI
          silent: !process.env.CI,

          // For all available options, see:
          // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

          // Upload a larger set of source maps for prettier stack traces (increases build time)
          widenClientFileUpload: true,

          // Automatically annotate React components to show their full name in breadcrumbs and session replay
          reactComponentAnnotation: {
              enabled: true,
          },

          // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
          // This can increase your server load as well as your hosting bill.
          // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
          // side errors will fail.
          // tunnelRoute: "/monitoring",

          // Hides source maps from generated client bundles
          hideSourceMaps: true,

          // Automatically tree-shake Sentry logger statements to reduce bundle size
          disableLogger: true,

          // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
          // See the following for more information:
          // https://docs.sentry.io/product/crons/
          // https://vercel.com/docs/cron-jobs
          automaticVercelMonitors: true,
      });
