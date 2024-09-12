import { resolve } from 'path';
import { FlatCompat } from '@eslint/eslintrc';

/**
 * Converts old eslint config structure (eslintrc) to the new flat config structure.
 * @url {https://eslint.org/blog/2022/08/new-config-system-part-2/#backwards-compatibility-utility}
 */
export const compat = new FlatCompat({
    baseDirectory: resolve(import.meta.dirname, '../../../../'),
});
