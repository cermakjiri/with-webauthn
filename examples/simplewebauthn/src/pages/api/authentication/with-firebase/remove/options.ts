import type { NextApiRequest, NextApiResponse } from 'next';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { generateChallenge } from '@simplewebauthn/server/helpers';
import type { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/types';

import { env } from '~env';
import { logger } from '~logger';
import { initializeChallengeSession } from '~server/services/challenge-session';
import { getPasskeys } from '~server/services/passkeys';
import { parseAndVerifyIdToken } from '~server/utils/parseAndVerifyIdToken';
import { getRpId } from '~server/utils/relyingParty';

export type StartRemovalResponseData = {
    publicKeyOptions: PublicKeyCredentialCreationOptionsJSON;
};

/**
 * Request options for WebAuthn verification before requesting passkey removal.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const idTokenResult = await parseAndVerifyIdToken(req.headers.authorization);

        if (!idTokenResult) {
            return res.status(401).end('User not authenticated.');
        }

        const userId = idTokenResult.uid;
        const passkeys = await getPasskeys(userId);

        /**
         * Generate a random string with enough entropy to prevent replay attacks.
         */
        const challenge = await generateChallenge();

        const authenticationOptions = await generateAuthenticationOptions({
            /**
             * Relying party ID: Hostname of your client app.
             * E.g. "localhost", "example.com" or "auth.example.com".
             */
            rpID: getRpId(env.NEXT_PUBLIC_CLIENT_ORIGIN),

            challenge,

            allowCredentials: passkeys.map(({ credentialId, transports }) => ({ id: credentialId, transports })),

            /**
             * User presense is not enough. Require user verification (e.g. PIN, fingerprint, face recognition) to verify user identity.
             * If the authenticator does not support user verification, the registration will fail.
             */
            userVerification: 'required',

            timeout: 300_000,
        });

        await initializeChallengeSession(res, {
            type: 'assertion',
            timeout: authenticationOptions.timeout!,
            challenge,
        });

        res.status(200).json({
            publicKeyOptions: authenticationOptions,
        });
    } catch (error) {
        logger.error(error);

        res.status(500).end(
            error instanceof Error && env.NEXT_PUBLIC_NODE_ENV !== 'production'
                ? error.message
                : 'Internal Server Error',
        );
    }
}
