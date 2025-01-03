import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyRegistrationResponse } from '@simplewebauthn/server';
import type { RegistrationResponseJSON } from '@simplewebauthn/types';

import { logger } from '@workspace/common/logger';
import { auth } from '@workspace/common/server/config/firebase';
import { retrieveAndInvalidateChallengeSession } from '@workspace/common/server/services/challenge-session';
import { createUserPasskey, findUserByUsername } from '@workspace/common/server/services/users';

export type VerifyRegistrationRequestData = {
    registrationResponse: RegistrationResponseJSON;
};

export type VerifyRegistrationResponseData = {
    customToken: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<VerifyRegistrationResponseData>) {
    try {
        const { registrationResponse } = req.body as VerifyRegistrationRequestData;

        const challengeSession = await retrieveAndInvalidateChallengeSession(req, res, 'attestation');

        if (!challengeSession || challengeSession.type !== 'attestation') {
            return res.status(401).end('Challenge session is not active. Please start the registration process again.');
        }

        const verifiedRegistrationResponse = await verifyRegistrationResponse({
            response: registrationResponse,
            expectedChallenge: challengeSession.challenge,
            expectedOrigin: challengeSession.origin,
            expectedRPID: challengeSession.rpId,
        });

        if (!verifiedRegistrationResponse.verified) {
            return res.status(401).end('User not authenticated.');
        }

        logger.debug('verifiedRegistrationResponse', verifiedRegistrationResponse);

        // Just an example what you can do with the result, not needed for this current authentication process itself
        // parseRegistrationResponse(registrationResponse);

        const { username } = challengeSession;

        const existingUser = await findUserByUsername(username);

        if (existingUser) {
            return res.status(400).end('User already exists.');
        }

        const userId = await createUserPasskey(username, verifiedRegistrationResponse.registrationInfo);

        /**
         * Creates a new Firebase custom token (JWT)
         * that can be sent back to a client device to use to sign in with the client SDKs' signInWithCustomToken() methods.
         */
        const customToken = await auth().createCustomToken(userId);

        res.status(200).json({ customToken });
    } catch (error) {
        logger.error(error);

        res.status(500).end((error as Error).message);
    }
}
