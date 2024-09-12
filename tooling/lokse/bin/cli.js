// @ts-check
const { execSync } = require('node:child_process');
const { resolve } = require('node:path');
const transformTranslations = require('../scripts/transformTranslations');

const lokse = resolve(__dirname, '../../../node_modules/.bin/lokse');
const args = process.argv.slice(2).join(' ');

try {
    execSync(`${lokse} ${args}`, { stdio: 'inherit' });

    if (args.includes('update')) {
        transformTranslations();
    }
} catch (error) {
    console.error(error);
    process.exit(1);
}
