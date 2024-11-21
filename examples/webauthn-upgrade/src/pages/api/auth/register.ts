import type { NextApiRequest, NextApiResponse } from 'next';
import { AuthErrorCodes } from 'firebase/auth';
import z from 'zod';

import { env } from '@workspace/common/client/env';
import { email, password } from '@workspace/common/client/form/validators';
import { logger } from '@workspace/common/logger';
import { auth } from '@workspace/common/server/config/firebase';

import { tokenClaims } from '~server/constans/tokenClaims';

export const registerRequestBody = z.object({
    email,
    password,
});

export type RegisterRequestData = z.infer<typeof registerRequestBody>;

export type RegisterResponseData = {
    customToken: string;
};

async function findUserByEmail(email: string) {
    try {
        return await auth().getUserByEmail(email);
    } catch (error) {
        // @ts-expect-error Yes, it be could parsed in a better way.
        if (error.errorInfo?.code === AuthErrorCodes.USER_DELETED) {
            return null;
        }

        logger.error(error);

        return null;
    }
}

/**
 * Classical email/password login if the user has not yet linked a passkey.
 * Then, the it signs in the user with email/password and sends WebAuthn options for retrieving a passkey.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<RegisterResponseData>) {
    try {
        const { email, password } = registerRequestBody.parse(req.body);

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(403).end('User with this email already exists.');
        }

        const user = await auth().createUser({
            email,
            password,
            emailVerified: false,
        });

        const customToken = await auth().createCustomToken(user.uid, { [tokenClaims.MFA_ENABLED]: false });

        res.send({ customToken });
    } catch (error) {
        logger.error(error);

        res.status(500).end(
            error instanceof Error && env.NEXT_PUBLIC_NODE_ENV !== 'production'
                ? error.message
                : 'Internal Server Error',
        );
    }
}
