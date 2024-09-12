// @ts-check
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const madge = resolve(import.meta.dirname, '../../../node_modules/.bin/madge');
const args = process.argv.slice(2).join(' ');

try {
    const madgeConfigDest = resolve(process.cwd(), '.madgerc');

    if (!existsSync(madgeConfigDest)) {
        console.log('Creating .madgerc file...');
        const madgeConfig = readFileSync(resolve(import.meta.dirname, '.madgerc'), 'utf-8');

        writeFileSync(madgeConfigDest, madgeConfig, { encoding: 'utf-8' });

        console.log(madgeConfig);
    }

    const madgeCommand = `${madge} --circular ${args}`;

    if (args.includes('--debug')) {
        console.log(madgeCommand);
    }

    execSync(madgeCommand, { stdio: 'inherit' });
    process.exit(0);
} catch (e) {
    if (args.includes('--debug')) {
        console.error(e);
    }

    process.exit(1);
}
