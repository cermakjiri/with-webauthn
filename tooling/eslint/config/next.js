// @ts-check
import tseslint from 'typescript-eslint';

import { common, ignored, javascript, nextjs, tanstackQuery, typescript } from './base.js';

export { compat } from './utils/index.js';

export const nextjsConfig = tseslint.config(
    ...ignored,
    ...javascript,
    ...typescript,
    ...tanstackQuery,
    ...nextjs,
    ...common,
);

export default nextjsConfig;
