import type { NextApiRequest, NextApiResponse } from 'next';
import { generateRegistrationOptions } from '@simplewebauthn/server';
import { generateChallenge } from '@simplewebauthn/server/helpers';
import type { PublicKeyCredentialCreationOptionsJSON } from '@simplewebauthn/types';
import { z } from 'zod';

import { env } from '~env';
import { logger } from '~logger';
import { RP_NAME } from '~server/constants/relyingParty';
import { initializeChallengeSession } from '~server/services/challenge-session';
import { getUserPasskeys } from '~server/services/users';
import { getRpId } from '~server/utils/relyingParty';

const startRegistrationRequestBody = z.object({
    username: z.string(),
});

export type StartRegistrationRequestData = z.infer<typeof startRegistrationRequestBody>;

export type StartRegistrationResponseData = {
    publicKeyOptions: PublicKeyCredentialCreationOptionsJSON;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<StartRegistrationResponseData>) {
    try {
        /**
         * Body must comply with the schema, else an error will be thrown.
         */
        const body = startRegistrationRequestBody.parse(req.body);

        const passkeys = await getUserPasskeys(body.username);

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

            userName: body.username,

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
            username: body.username,
            webAuthnUserId: registrationOptions.user.id,
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
