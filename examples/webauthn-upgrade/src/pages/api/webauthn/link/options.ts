import type { NextApiRequest, NextApiResponse } from 'next';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { generateChallenge } from '@simplewebauthn/server/helpers';
import type { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/types';

import { env } from '@workspace/common/client/env';
import { logger } from '@workspace/common/logger';
import { auth } from '@workspace/common/server/config/firebase';
import { RP_NAME } from '@workspace/common/server/constants/relyingParty';
import { initializeChallengeSession } from '@workspace/common/server/services/challenge-session';
import { getPasskeys } from '@workspace/common/server/services/passkeys';
import { createUserWithNoPasskeys, getUser } from '@workspace/common/server/services/users';
import { getRpId, parseAndVerifyIdToken } from '@workspace/common/server/utils';

import { tokenClaims } from '~server/constans/tokenClaims';

export type StartLinkingResponseData = {
    publicKeyOptions: PublicKeyCredentialCreationOptionsJSON;
};

/**
 * Upgrade from email/password auth. provider to MFA with passkeys.
 *  - Check if user provided valid token.
 *  - Create user with no passkeys if user does not exist.
 *  - Proceed with WebAuthn registration.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<StartLinkingResponseData>) {
    try {
        const idTokenResult = await parseAndVerifyIdToken(req.headers.authorization);

        if (!idTokenResult || !idTokenResult.email_verified) {
            logger.error('User not authenticated. No ID token or email not verified.');

            return res.status(401).end('User not authenticated.');
        }

        const userId = idTokenResult.uid;
        const authUser = await auth().getUser(userId);
        const username = authUser.email!;

        const user = await getUser(userId);

        if (user === null) {
            await createUserWithNoPasskeys(userId, username);
        }

        const passkeys = await getPasskeys(userId);

        // ID token claims must include 'mfa_enabled: true' once at least one passkey has been added.
        if (passkeys.length > 0 && !idTokenResult[tokenClaims.MFA_ENABLED]) {
            logger.error('User has passkeys but MFA is not enabled.');

            return res.status(401).end('User not authenticated.');
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

            userName: username,

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
            username,
        });

        res.status(200).json({
            publicKeyOptions: registrationOptions,
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
