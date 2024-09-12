// @ts-check
const { execSync } = require('child_process');
const { resolve } = require('path');

const ROOT = resolve(__dirname, '../..');

function getStagedAndScopedFiles() {
    return execSync('git diff --staged --name-only --diff-filter=AM .')
        .toString()
        .split('\n')
        .filter(file => file.trim().length > 0)
        .map(file => resolve(ROOT, file));
}

/**
 * @param {string[]} files
 * @returns
 */
function stageFiles(files) {
    return execSync(`git add ${files.join(' ')}`, { stdio: 'inherit' });
}

/**
 *
 * @param {(files: string) => void} commandCallback
 */
function transformStagedFiles(commandCallback) {
    const files = getStagedAndScopedFiles();

    if (files.length > 0) {
        commandCallback(files.join(' '));
        stageFiles(files);
    }
}

module.exports = transformStagedFiles;
