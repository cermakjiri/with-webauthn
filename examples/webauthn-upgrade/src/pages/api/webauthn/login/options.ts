import type { NextApiRequest, NextApiResponse } from 'next';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { generateChallenge } from '@simplewebauthn/server/helpers';
import type { PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/types';

import { env } from '@workspace/common/client/env';
import { logger } from '@workspace/common/logger';
import { initializeChallengeSession } from '@workspace/common/server/services/challenge-session';
import { getRpId } from '@workspace/common/server/utils';

export type StartLoginResponseData = {
    publicKeyOptions: PublicKeyCredentialRequestOptionsJSON;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<StartLoginResponseData>) {
    try {
        // Generate a random string with enough entropy to prevent replay attacks.
        const challenge = await generateChallenge();

        const authenticationOptions = await generateAuthenticationOptions({
            /**
             * Relying party ID: Hostname of your client app.
             * E.g. "localhost", "example.com" or "auth.example.com".
             */
            rpID: getRpId(env.NEXT_PUBLIC_CLIENT_ORIGIN),

            challenge,

            allowCredentials: [],

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

        res.status(500).end((error as Error).message);
    }
}
