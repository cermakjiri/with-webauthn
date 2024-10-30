import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyRegistrationResponse } from '@simplewebauthn/server';
import type { RegistrationResponseJSON } from '@simplewebauthn/types';

import { env } from '~env';
import { logger } from '~logger';
import { retrieveAndInvalidateChallengeSession } from '~server/services/challenge-session';
import { addUserPasskey } from '~server/services/users';
import { parseAndVerifyIdToken } from '~server/utils/parseAndVerifyIdToken';

export type VerifyLinkRequestData = {
    registrationResponse: RegistrationResponseJSON;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const idTokenResult = await parseAndVerifyIdToken(req.headers.authorization);

        if (!idTokenResult) {
            return res.status(401).end('User not authenticated.');
        }

        const { registrationResponse } = req.body as VerifyLinkRequestData;

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

        const userId = idTokenResult.uid;

        await addUserPasskey(userId, {
            registrationResponse,
            verifiedRegistrationInfo: verifiedRegistrationResponse.registrationInfo,
        });

        res.status(200).end();
    } catch (error) {
        logger.error(error);

        res.status(500).end(
            error instanceof Error && env.NEXT_PUBLIC_NODE_ENV !== 'production'
                ? error.message
                : 'Internal Server Error',
        );
    }
}
