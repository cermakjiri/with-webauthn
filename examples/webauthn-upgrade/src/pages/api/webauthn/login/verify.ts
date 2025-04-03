import type { NextApiRequest, NextApiResponse } from 'next';
import { base64URLStringToBuffer } from '@simplewebauthn/browser';
import { verifyAuthenticationResponse, type AuthenticationResponseJSON } from '@simplewebauthn/server';
import { FieldValue } from 'firebase-admin/firestore';

import { logger } from '@workspace/common/logger';
import { retrieveAndInvalidateChallengeSession } from '@workspace/common/server/services/challenge-session';
import { getPasskeyBy, updatePasskey } from '@workspace/common/server/services/passkeys';

import { tokenClaims } from '~server/constans/tokenClaims';
import { revokenAndCreateCustomUserToken } from '~server/services/auth';

export type VerifyLoginRequestData = {
    authenticationResponse: AuthenticationResponseJSON;
};

export type VerifyLoginResponseData = {
    customToken: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<VerifyLoginResponseData>) {
    try {
        const { authenticationResponse } = req.body as VerifyLoginRequestData;

        const challengeSession = await retrieveAndInvalidateChallengeSession(req, res, 'assertion');

        if (!challengeSession || challengeSession.type !== 'assertion') {
            return res.status(401).end('Challenge session is not active. Please start the login process again.');
        }

        const passkey = await getPasskeyBy('credentialId', authenticationResponse.id);

        // This might happen if the user has removed the passkey from the account
        // but the private passkey source is still stored in a keychain / password manager.
        if (!passkey) {
            // Yes, this message would have been better however it could be a security risk (i.e. username enumeration):
            // Checkout https://w3c.github.io/webauthn/#sctn-username-enumeration.
            // return res.status(400).end('Passkey not found.');
            return res.status(401).end('User not verified.');
        }

        const { transports, credentialId, credentialPublicKey, credentialCounter } = passkey;

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

        // Just an example what you can do with the result, not needed for this current authentication process itself
        // parseAutheticationResponse(authenticationResponse)

        await updatePasskey(passkey.id, {
            credentialCounter: result.authenticationInfo.newCounter,
            // @ts-expect-error
            lastUsedAt: FieldValue.serverTimestamp(),
        });

        const customToken = await revokenAndCreateCustomUserToken(passkey.userId, { [tokenClaims.MFA_ENABLED]: true });

        res.status(200).json({ customToken });
    } catch (error) {
        logger.error(error);

        res.status(500).end((error as Error).message);
    }
}
