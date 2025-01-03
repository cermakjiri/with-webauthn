import type { NextApiRequest, NextApiResponse } from 'next';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { generateChallenge } from '@simplewebauthn/server/helpers';
import type { PublicKeyCredentialRequestOptionsJSON } from '@simplewebauthn/types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import z from 'zod';

import { env } from '@workspace/common/client/env';
import { auth as clientAuth } from '@workspace/common/client/firebase/config';
import { email, password } from '@workspace/common/client/form/validators';
import { logger } from '@workspace/common/logger';
import { auth as serverAuth } from '@workspace/common/server/config/firebase';
import { initializeChallengeSession } from '@workspace/common/server/services/challenge-session';
import { getPasskeys } from '@workspace/common/server/services/passkeys';
import { getUserPasskeys } from '@workspace/common/server/services/users';
import { getRpId } from '@workspace/common/server/utils';

import { tokenClaims } from '~server/constans/tokenClaims';

async function generateUserAuthenticationOptions(email: string, challenge: Uint8Array) {
    const passkeys = await getUserPasskeys(email);

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
         * However `allowCredentials` are required if user has registered passkey with the authenticator that doesn't support discoverable credentials (i.e. list of credentials IDs must be provide so that the authenticator can show list of available passkeys to the user).
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

    return authenticationOptions;
}

export const loginRequestBody = z.object({
    email,
    password,
});

export type LoginRequestData = z.infer<typeof loginRequestBody>;

export type LoginResponseData =
    | {
          customToken: string;
          mfa: false;
      }
    | {
          publicKeyOptions: PublicKeyCredentialRequestOptionsJSON;
          mfa: true;
      };

/**
 * 1. Verifies email/password combination.
 * 2. Retrieves passkeys for given user.
 * 3. If the user has some passkeys, then generate options for for WebAuthn sign-in (i.e. for the `navigator.credentials.get` method).
 * 4. Else send custom token with `mfa_enabled: false` encoded flag.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<LoginResponseData>) {
    try {
        const { email, password } = loginRequestBody.parse(req.body);

        const userCrendential = await signInWithEmailAndPassword(clientAuth(), email, password);

        if (!userCrendential.user.emailVerified) {
            res.status(400).end('Email not verified.');

            return;
        }

        const passkeys = await getPasskeys(userCrendential.user.uid);

        // User added has some passkeys (i.e. his account upgraded to MFA)
        // The user must finish the authentication with passkeys.
        if (passkeys.length > 0) {
            // Generate a random string with enough entropy to prevent replay attacks.
            const challenge = await generateChallenge();

            const publicKeyOptions = await generateUserAuthenticationOptions(email, challenge);

            await initializeChallengeSession(res, {
                type: 'assertion',
                timeout: publicKeyOptions.timeout!,
                challenge,
            });

            res.send({ publicKeyOptions, mfa: true });

            return;
        }

        const customToken = await serverAuth().createCustomToken(userCrendential.user.uid, {
            [tokenClaims.MFA_ENABLED]: false,
        });

        res.send({ customToken, mfa: false });
    } catch (error) {
        logger.error(error);

        res.status(500).end((error as Error).message);
    }
}
