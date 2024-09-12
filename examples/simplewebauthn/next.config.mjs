// @ts-check
import path from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import './src/env/env.mjs';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    output: 'standalone',
    experimental: {
        outputFileTracingRoot: path.join(import.meta.dirname, '../../'),
    },

    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
    },

    // https://dev.to/chromygabor/add-typescript-type-check-to-next-js-2nbb
    webpack(config, options) {
        // Do not run type checking twice:
        if (options.dev && options.isServer) {
            config.plugins.push(
                new ForkTsCheckerWebpackPlugin({
                    typescript: {
                        memoryLimit: 4096,
                    },
                }),
            );
        }

        return config;
    },

    /**
     * @type {(keyof (typeof import('./package.json'))['dependencies'])[]}
     */
    transpilePackages: ['@workspace/ui', '@workspace/logger'],

    redirects: async () => {
        return [];
    },
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
export default nextConfig;
