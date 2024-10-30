import type { NextApiRequest, NextApiResponse } from 'next';
import { base64URLStringToBuffer } from '@simplewebauthn/browser';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import type { AuthenticationResponseJSON } from '@simplewebauthn/types';

import { env } from '~env';
import { logger } from '~logger';
import { retrieveAndInvalidateChallengeSession } from '~server/services/challenge-session';
import { getPasskey, getPasskeyBy } from '~server/services/passkeys';
import { removeUserPasskey } from '~server/services/users';
import type { Passkey } from '~server/types';
import { parseAndVerifyIdToken } from '~server/utils/parseAndVerifyIdToken';

export type VerifyRemovalRequestData = {
    authenticationResponse: AuthenticationResponseJSON;
    passkeyId: string;
};

/**
 * Verify the user's identity before removing the passkey.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<Passkey>) {
    try {
        const idTokenResult = await parseAndVerifyIdToken(req.headers.authorization);

        if (!idTokenResult) {
            return res.status(401).end('User not authenticated.');
        }

        const challengeSession = await retrieveAndInvalidateChallengeSession(req, res, 'assertion');

        if (!challengeSession || challengeSession.type !== 'assertion') {
            return res.status(401).end('Challenge session is not active. Please start the login process again.');
        }

        const { authenticationResponse, passkeyId } = req.body as VerifyRemovalRequestData;

        const passkeyForAuthentication = await getPasskeyBy('credentialId', authenticationResponse.id);

        if (!passkeyForAuthentication) {
            return res.status(400).end('Passkey for authenticaiton not found.');
        }

        const { transports, credentialId, credentialPublicKey, credentialCounter } = passkeyForAuthentication;

        const result = await verifyAuthenticationResponse({
            response: authenticationResponse,
            expectedRPID: challengeSession.rpId,
            expectedOrigin: challengeSession.origin,
            expectedChallenge: challengeSession.challenge,
            credential: {
                publicKey: new Uint8Array(base64URLStringToBuffer(credentialPublicKey)),
                counter: credentialCounter,
                transports,
                id: credentialId,
            },
            requireUserVerification: true,
        });

        logger.debug('verifyAuthenticationResponse:', result);

        if (!result.verified) {
            return res.status(401).end('User not verified.');
        }

        const passkeyForRemoval = await getPasskey(passkeyId);

        if (!passkeyForRemoval) {
            return res.status(400).end('Passkey for removal not found.');
        }

        await removeUserPasskey(passkeyForRemoval.userId, passkeyForRemoval.id);

        res.status(200).json(passkeyForRemoval);
    } catch (error) {
        logger.error(error);

        res.status(500).end(
            error instanceof Error && env.NEXT_PUBLIC_NODE_ENV !== 'production'
                ? error.message
                : 'Internal Server Error',
        );
    }
}
