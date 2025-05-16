import type { NextApiRequest, NextApiResponse } from 'next';
import { generateRegistrationOptions, type PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/server';
import { generateChallenge } from '@simplewebauthn/server/helpers';

import { env } from '@workspace/common/client/env';
import { logger } from '@workspace/common/logger';
import { RP_NAME } from '@workspace/common/server/constants/relyingParty';
import { initializeChallengeSession } from '@workspace/common/server/services/challenge-session';
import { getPasskeys } from '@workspace/common/server/services/passkeys';
import { getUser } from '@workspace/common/server/services/users';
import { getRpId, parseAndVerifyIdToken } from '@workspace/common/server/utils';

export type StartLinkingResponseData = {
    publicKeyOptions: PublicKeyCredentialCreationOptionsJSON;
};

/**
 * Request options for creating a new passkey for existing account – ;ink another authenticator to the user account.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<StartLinkingResponseData>) {
    try {
        const idTokenResult = await parseAndVerifyIdToken(req.headers.authorization);

        if (!idTokenResult) {
            return res.status(401).end('User not authenticated.');
        }

        const userId = idTokenResult.uid;
        const passkeys = await getPasskeys(userId);
        const user = await getUser(userId);

        if (!user) {
            return res.status(400).end('User not found.');
        }

        /**
         * Generate a random string with enough entropy to be signed by the authenticator to prevent replay attacks.
         */
        const challenge = await generateChallenge();

        const registrationOptions = await generateRegistrationOptions({
            /**
             * Relying party ID: Hostname of your client app.
             * E.g. "localhost", "example.com" or "auth.example.com".
             */
            rpID: getRpId(env.NEXT_PUBLIC_CLIENT_ORIGIN),

            /**
             * Relying party name: Display name of your client app.
             */
            rpName: RP_NAME,

            challenge,

            userName: user.username,

            /**
             * Prevent creating multiple user passkeys on the same authenticator.
             */
            excludeCredentials: passkeys.map(({ credentialId, transports }) => ({
                id: credentialId,
                transports,
            })),

            /**
             * Require authenticator to provide proof of its origin.
             */
            attestationType: 'direct',

            authenticatorSelection: {
                /**
                 * User presense is not enough. Require user verification (e.g. PIN, fingerprint) to verify user identity.
                 * If the authenticator does not support user verification, the registration will fail.
                 */
                userVerification: 'required',

                residentKey: 'preferred',
            },

            /**
             * Recommended range: 300_000 milliseconds to 600_000 milliseconds.
             * Recommended default value: 300_000 milliseconds (5 minutes).
             * https://www.w3.org/TR/webauthn-3/#sctn-createCredential
             */
            timeout: 300_000,
        });

        await initializeChallengeSession(res, {
            type: 'attestation',
            timeout: registrationOptions.timeout!,
            challenge,
            username: user.username,
        });

        res.status(200).json({
            publicKeyOptions: registrationOptions,
        });
    } catch (error) {
        logger.error(error);

        res.status(500).end((error as Error).message);
    }
}
