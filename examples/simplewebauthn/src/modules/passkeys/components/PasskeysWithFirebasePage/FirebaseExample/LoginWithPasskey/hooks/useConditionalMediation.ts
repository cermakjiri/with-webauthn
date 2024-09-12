import { browserSupportsWebAuthnAutofill, startAuthentication } from '@simplewebauthn/browser';
import { useQuery } from '@tanstack/react-query';
import { signInWithCustomToken } from 'firebase/auth';

import { logger } from '~logger';
import { fetcher } from '~modules/api/fetcher';
import { auth } from '~modules/firebase/config';
import { parseWebAuthnError } from '~modules/passkeys/utils';
import { useSnack } from '~modules/snackbar/hooks';
import type { StartLoginResponseData } from '~pages/api/authentication/with-firebase/login/options';
import type {
    VerifyLoginRequestData,
    VerifyLoginResponseData,
} from '~pages/api/authentication/with-firebase/login/verify';

import { useExampleRouter } from '../../ExampleRouter';

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
                    url: '/authentication/with-firebase/login/options',
                });

                logger.info('/authentication/with-firebase/login/options', publicKeyOptions);

                const result = await startAuthentication(publicKeyOptions, true);

                logger.info('startAuthentication', result);

                const { data } = await fetcher<VerifyLoginResponseData>({
                    method: 'POST',
                    url: '/authentication/with-firebase/login/verify',
                    body: {
                        authenticationResponse: result,
                    } satisfies VerifyLoginRequestData,
                });

                logger.info('/authentication/with-firebase/login/verify', data);

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
