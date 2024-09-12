import dotenv from 'dotenv';
import { z } from 'zod';

const envs = dotenv.config({
    path: '.env.server',
    processEnv: {},
});

if (envs.error) {
    throw new Error(envs.error.message);
}

export const env = z
    .object({
        FIREBASE_PROJECT_ID: z.string(),
        FIREBASE_PRIVATE_KEY: z.string(),
        FIREBASE_CLIENT_EMAIL: z.string(),
    })
    .parse(envs.parsed);
