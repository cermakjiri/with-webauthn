import type { NextApiRequest, NextApiResponse } from 'next';
import { base64URLStringToBuffer } from '@simplewebauthn/browser';
import { verifyAuthenticationResponse, type AuthenticationResponseJSON } from '@simplewebauthn/server';

import { logger } from '@workspace/common/logger';
import { retrieveAndInvalidateChallengeSession } from '@workspace/common/server/services/challenge-session';
import { getPasskey, getPasskeyBy, getPasskeys } from '@workspace/common/server/services/passkeys';
import { removeUserPasskey } from '@workspace/common/server/services/users';
import type { Passkey } from '@workspace/common/types';

import { tokenClaims } from '~server/constans/tokenClaims';
import { revokenAndCreateCustomUserToken } from '~server/services/auth';
import { parseAndVerifyIdTokenForMFA } from '~server/utils/parseAndVerifyIdTokenForMFA';

export type VerifyRemovalRequestData = {
    authenticationResponse: AuthenticationResponseJSON;
    passkeyId: string;
};

export type VerifyRemovalResponseData =
    | {
          /**
           * Removed passkey.
           */
          passkey: Passkey;
          mfa: true;
      }
    | {
          /**
           * Removed passkey.
           */
          passkey: Passkey;

          /**
           * Once all passkeys have been removed, a new token is generated with `mfa_enabled: false` flag.
           */
          customToken: string;
          mfa: false;
      };

/**
 * Verify the user's identity before removing the passkey.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<VerifyRemovalResponseData>) {
    try {
        const idTokenResult = await parseAndVerifyIdTokenForMFA(req.headers.authorization);

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

        const userId = passkeyForRemoval.userId;

        await removeUserPasskey(userId, passkeyForRemoval.id);

        const userPasskeys = await getPasskeys(userId);

        if (userPasskeys.length === 0) {
            const customToken = await revokenAndCreateCustomUserToken(userId, { [tokenClaims.MFA_ENABLED]: false });

            res.status(200).json({
                mfa: false,
                customToken,
                passkey: passkeyForRemoval,
            });
        } else {
            res.status(200).json({
                mfa: true,
                passkey: passkeyForRemoval,
            });
        }
    } catch (error) {
        logger.error(error);

        res.status(500).end((error as Error).message);
    }
}
