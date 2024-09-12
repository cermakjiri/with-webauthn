// @ts-check
import { resolve } from 'node:path';
// @ts-expect-error - no types
import prettierEslintConfig from 'eslint-config-prettier';
// @ts-expect-error - no types
import turboEslintPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';

import { parseIgnoreFile } from '../utils/parseIgnoreFile.js';
import { compat } from './utils/index.js';

/**
 * @satisfies {import('typescript-eslint').ConfigWithExtends}
 */
export const typescript = {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
        parserOptions: {
            warnOnUnsupportedTypeScriptVersion: false,
        },
        parser: tseslint.parser,
    },
    plugins: {
        '@typescript-eslint': tseslint.plugin,
    },
    rules: {
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-import-type-side-effects': 'error',
    },
};

/**
 * @satisfies {import('typescript-eslint').ConfigWithExtends}
 */
export const javascript = {
    files: ['**/*.{mjs,cjs,js,jsx,ts,tsx}'],
    rules: {
        'no-use-before-define': 'off',
        'arrow-body-style': 'off',
        'padding-line-between-statements': [
            'warn',
            { blankLine: 'always', prev: '*', next: 'return' },
            { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
            { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
            { blankLine: 'always', prev: ['function', 'class', 'multiline-const'], next: '*' },
            { blankLine: 'always', prev: ['import', 'export'], next: '*' },
            { blankLine: 'any', prev: 'import', next: 'import' },
            { blankLine: 'any', prev: 'export', next: 'export' },
        ],
    },
};

/**
 * @satisfies {import('typescript-eslint').ConfigWithExtends}
 */
export const common = {
    files: ['**/*.{mjs,cjs,js,jsx,ts,tsx}'],
    plugins: {
        turbo: turboEslintPlugin,
    },
    extends: [prettierEslintConfig],
    rules: {
        'turbo/no-undeclared-env-vars': 'off',
    },
};

/**
 * @satisfies {import('typescript-eslint').ConfigWithExtends}
 */
export const ignored = {
    // Ignore all valid files / directories from global .gitignore file
    ignores: parseIgnoreFile(resolve(import.meta.dirname, '../../../.gitignore')),
};

export const tanstackQuery = compat.config({
    plugins: ['@tanstack/eslint-plugin-query'],
    extends: ['plugin:@tanstack/eslint-plugin-query/recommended'],
});

export const nextjs = compat.config({
    extends: ['next/core-web-vitals'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        babelOptions: {
            presets: [resolve(import.meta.dirname, '../../../node_modules/next/babel.js')],
        },
        ecmaVersion: 'latest',
    },
    rules: {
        'no-use-before-define': 'off',
        'padding-line-between-statements': [
            'warn',
            { blankLine: 'always', prev: '*', next: 'return' },
            { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
            { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
            { blankLine: 'always', prev: ['function', 'class', 'multiline-const'], next: '*' },
            { blankLine: 'always', prev: ['import', 'export'], next: '*' },
            { blankLine: 'any', prev: 'import', next: 'import' },
            { blankLine: 'any', prev: 'export', next: 'export' },
        ],

        indent: ['error', 4, { SwitchCase: 1 }],
        // https://eslint.org/docs/rules/no-var
        'no-var': 'error',
        // https://eslint.org/docs/rules/max-len
        'max-len': [
            'warn',
            120,
            4,
            {
                ignoreComments: true,
                ignoreUrls: true,
                ignorePattern: '^\\s*var\\s.+=\\s*require\\s*\\(',
            },
        ],

        // https://eslint.org/docs/rules/prefer-const
        'prefer-const': 'error',

        // https://eslint.org/docs/rules/space-before-function-paren
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],

        // https://eslint.org/docs/rules/no-console
        'no-console': 'error',

        // https://eslint.org/docs/rules/no-warning-comments
        'no-warning-comments': 'off',

        // https://eslint.org/docs/rules/spaced-comment
        'spaced-comment': [
            'error',
            'always',
            {
                line: {
                    markers: ['/'],
                    exceptions: ['-', '+'],
                },
            },
        ],

        // https://eslint.org/docs/rules/comma-dangle
        'comma-dangle': [
            'error',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'ignore',
                exports: 'ignore',
                functions: 'ignore',
            },
        ],

        // https://eslint.org/docs/rules/no-return-assign
        'no-return-assign': ['error'],

        'no-unused-expressions': [
            'error',
            {
                allowShortCircuit: true,
                allowTernary: true,
                allowTaggedTemplates: false,
            },
        ],

        'object-curly-spacing': ['warn', 'always'],

        // https://eslint.org/docs/rules/curly
        curly: ['warn', 'all'],

        // -----

        'import/no-anonymous-default-export': 'off',

        /**
         * REASON: https://ackee.slack.com/archives/C07BZ9K32/p1536067640000100
         */
        'import/prefer-default-export': 'off',

        // This would conflict with prettier
        'import/order': 'off',

        // -----

        'react/react-in-jsx-scope': 'off',
        'react/self-closing-comp': ['warn'],
        'react/jsx-curly-brace-presence': [
            'warn',
            {
                props: 'never',
                children: 'never',
                propElementValues: 'always',
            },
        ],

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
        'react/jsx-indent': ['error', 4],

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
        'react/jsx-indent-props': ['error', 4],

        // ----

        'react-hooks/exhaustive-deps': 'error',

        // ----

        '@next/next/no-html-link-for-pages': 'off',
    },
});
