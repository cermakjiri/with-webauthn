import { startAuthentication } from '@simplewebauthn/browser';
import { useMutation } from '@tanstack/react-query';
import { signInWithCustomToken } from 'firebase/auth';

import { fetcher } from '@workspace/common/client/api/fetcher';
import { parseUnknownError } from '@workspace/common/client/errors';
import { auth } from '@workspace/common/client/firebase/config';
import { logger } from '@workspace/common/logger';

import type { StartLoginResponseData } from '~pages/api/webauthn/login/options';
import type { VerifyLoginRequestData, VerifyLoginResponseData } from '~pages/api/webauthn/login/verify';

import { useExampleRouter } from '../../DefaultExampleRouter';

export function useLoginWithPasskey() {
    const { redirect } = useExampleRouter();

    return useMutation<void, Awaited<ReturnType<typeof parseUnknownError>>>({
        mutationFn: async () => {
            try {
                const {
                    data: { publicKeyOptions },
                } = await fetcher<StartLoginResponseData>({
                    method: 'GET',
                    url: '/webauthn/login/options',
                });

                logger.info('/webauthn/login/options', { publicKeyOptions });

                const result = await startAuthentication({
                    optionsJSON: publicKeyOptions,
                });

                logger.info('WebAuthn API result:', result);

                const { data } = await fetcher<VerifyLoginResponseData>({
                    method: 'POST',
                    url: '/webauthn/login/verify',
                    body: {
                        authenticationResponse: result,
                    } satisfies VerifyLoginRequestData,
                });

                logger.info('/webauthn/login/verify', { data });

                await signInWithCustomToken(auth(), data.customToken);

                // NOTE: The Authorization header with ID token is set in request inceptor in AuthProvider.tsx component.
                redirect('/passkeys');
            } catch (error) {
                throw await parseUnknownError(error);
            }
        },
    });
}
