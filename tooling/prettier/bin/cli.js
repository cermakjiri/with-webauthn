// @ts-check
const { execSync } = require('node:child_process');
const { resolve } = require('node:path');
const createStaged = require('@tooling/staged');

/**
 * @param {string} args
 */
function format(args) {
    const prettierBinPath = resolve(__dirname, '../../../node_modules/.bin/prettier');
    const gitignore = resolve(__dirname, '../../../.gitignore');

    if (!args.includes('--write')) {
        args += ' --write ./**/*';
    }

    console.log('Formatting files with Prettier:');

    execSync(
        `${prettierBinPath} --ignore-path ${gitignore} --ignore-unknown --log-level=warn --cache --cache-strategy=content --cache-location=.cache/prettier ${args}`,
        {
            encoding: 'utf8',
            stdio: 'inherit',
        },
    );

    console.log('\n');
}

let args = process.argv.slice(2).join(' ');

if (args.includes('--staged')) {
    createStaged(stagedFiles => {
        args = args.replace('--staged', ` --write ${stagedFiles}`);

        format(args);
    });
} else {
    format(args);
}
