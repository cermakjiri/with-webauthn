import type { NextApiRequest, NextApiResponse } from 'next';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { generateChallenge } from '@simplewebauthn/server/helpers';
import type { PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/types';
import { z } from 'zod';

import { env } from '~env';
import { logger } from '~logger';
import { initializeChallengeSession } from '~server/services/challenge-session';
import { getUserPasskeys } from '~server/services/users';
import { getRpId } from '~server/utils/relyingParty';

export const startAuthenticationRequestBody = z.object({
    /**
     * It's required for login but optional for conditional UI (i.e. fetching a list of avail. passkeys for autofill).
     */
    username: z.string().optional(),
});

export type StartLoginRequestData = z.infer<typeof startAuthenticationRequestBody>;

export type StartLoginResponseData = {
    publicKeyOptions: PublicKeyCredentialRequestOptionsJSON;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<StartLoginResponseData>) {
    try {
        const body = req.body ? startAuthenticationRequestBody.parse(req.body) : null;

        const passkeys = await getUserPasskeys(body?.username);

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

            /**
             * We might not want to provide list of available passkeys to unauthenticated users for privacy reasons:
             * - https://w3c.github.io/webauthn/#sctn-credential-id-privacy-leak
             * - https://w3c.github.io/webauthn/#sctn-unprotected-account-detection (This is not relevent for this demo but, I believe, developers should be aware of this when implementing WebAuthn in production.)
             * // TODO: implement protection against privacy leaks above
             */
            allowCredentials: passkeys.map(({ credentialId, transports }) => ({
                id: credentialId,
                transports,
            })),

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
