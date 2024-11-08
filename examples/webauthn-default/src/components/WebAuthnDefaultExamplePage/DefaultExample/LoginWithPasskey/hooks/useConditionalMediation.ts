import { browserSupportsWebAuthnAutofill, startAuthentication } from '@simplewebauthn/browser';
import { useQuery } from '@tanstack/react-query';
import { signInWithCustomToken } from 'firebase/auth';

import { fetcher } from '@workspace/common/client/api/fetcher';
import { auth } from '@workspace/common/client/firebase/config';
import { useSnack } from '@workspace/common/client/snackbar/hooks';
import { parseWebAuthnError } from '@workspace/common/client/webauthn/utils';
import { logger } from '@workspace/common/logger';

import type { StartLoginResponseData } from '~pages/api/webauthn/login/options';
import type { VerifyLoginRequestData, VerifyLoginResponseData } from '~pages/api/webauthn/login/verify';

import { useExampleRouter } from '../../DefaultExampleRouter';

export function useConditionalMediation() {
    const { redirect } = useExampleRouter();
    const snack = useSnack();

    return useQuery({
        queryKey: ['passkeysAutoFill'],
        queryFn: async () => {
            try {
                const supported = await browserSupportsWebAuthnAutofill();

                if (!supported) {
                    return false;
                }

                const {
                    data: { publicKeyOptions },
                } = await fetcher<StartLoginResponseData>({
                    method: 'GET',
                    url: '/webauthn/login/options',
                });

                logger.info('/webauthn/login/options', publicKeyOptions);

                const result = await startAuthentication({
                    optionsJSON: publicKeyOptions,
                    useBrowserAutofill: true,
                });

                logger.info('startAuthentication', result);

                const { data } = await fetcher<VerifyLoginResponseData>({
                    method: 'POST',
                    url: '/webauthn/login/verify',
                    body: {
                        authenticationResponse: result,
                    } satisfies VerifyLoginRequestData,
                });

                logger.info('/webauthn/login/verify', data);

                const userCredential = await signInWithCustomToken(auth(), data.customToken);

                logger.info('signInWithCustomToken', { userCredential });

                redirect('/passkeys');

                return true;
            } catch (error) {
                const parsedError = await parseWebAuthnError(error);

                if (parsedError.type !== 'ABORT_ERROR') {
                    snack('error', parsedError.message);
                }

                throw error;
            }
        },
        retry: false,
    });
}
