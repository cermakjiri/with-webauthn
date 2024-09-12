import { readFileSync } from 'node:fs';

export function parseIgnoreFile(ignoreFile) {
    const ignoreFileContent = readFileSync(ignoreFile, 'utf8');

    return ignoreFileContent.split('\n').filter(row => row.trim().length > 0 && !row.startsWith('#'));
}
