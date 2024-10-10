import dotenv from 'dotenv';
import { z } from 'zod';

if (process.env.NODE_ENV !== 'production') {
    const envs = dotenv.config({
        path: '.env.server',
        processEnv: {},
    });

    if (envs.error) {
        throw new Error(envs.error.message);
    }
}

export const env = z
    .object({
        FIREBASE_PROJECT_ID: z.string(),
        FIREBASE_PRIVATE_KEY: z.string(),
        FIREBASE_CLIENT_EMAIL: z.string(),
    })
    .parse({
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
        FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    });
