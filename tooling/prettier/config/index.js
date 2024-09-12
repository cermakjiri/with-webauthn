// @ts-check
const { generateImportOrder } = require('./utils/index.js');

/**
 * @type {import('@ianvs/prettier-plugin-sort-imports').PrettierConfig}
 */
const config = {
    singleQuote: true,
    jsxSingleQuote: true,
    semi: true,
    arrowParens: 'avoid',
    printWidth: 120,
    tabWidth: 4,
    trailingComma: 'all',

    plugins: [require.resolve('@ianvs/prettier-plugin-sort-imports')],
    importOrder: generateImportOrder([
        [
            '^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
            '^(next/(.*)$)|^(next$)',
            '<BUILTIN_MODULES>',
            '<THIRD_PARTY_MODULES>',
        ],
        ['^@workspace/(.*)$'],
        ['^~(.*)$'],
        ['^[../]', '^[./]'],
    ]),

    /**
     * >=5.x
     */
    importOrderTypeScriptVersion: '5.0.0',

    overrides: [
        {
            files: ['*.json', '*.jsonc'],
            options: {
                trailingComma: 'none',
            },
        },
    ],
};

module.exports = config;
