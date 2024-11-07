import dotenv from 'dotenv';
import { z } from 'zod';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({
        path: '.env.server',
    });
}

export const env = z
    .object({
        FIREBASE_PROJECT_ID: z.string(),
        FIREBASE_PRIVATE_KEY: z.string(),
        FIREBASE_CLIENT_EMAIL: z.string(),
        FIREBASE_DB_ID: z.string().optional(),
    })
    .parse({
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
        FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
        FIREBASE_DB_ID: process.env.FIREBASE_DB_ID,
    });
