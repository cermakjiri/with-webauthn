import { startAuthentication } from '@simplewebauthn/browser';
import { signInWithCustomToken } from 'firebase/auth';

import { logger } from '~logger';
import { fetcher } from '~modules/api/fetcher';
import { auth } from '~modules/firebase/config';
import type { FormProps } from '~modules/form/components';
import { parseWebAuthnError } from '~modules/passkeys/utils';
import type {
    StartLoginRequestData,
    StartLoginResponseData,
} from '~pages/api/authentication/with-firebase/login/options';
import type {
    VerifyLoginRequestData,
    VerifyLoginResponseData,
} from '~pages/api/authentication/with-firebase/login/verify';

import { useExampleRouter } from '../../ExampleRouter';
import type { LoginFormSchema, LoginFormValues } from '../schema';

export function useLoginWithPasskey(): FormProps<LoginFormSchema, LoginFormValues>['onSubmit'] {
    const { redirect } = useExampleRouter();

    return async function loginWithPasskey({ email: username }, { setError }) {
        try {
            const {
                data: { publicKeyOptions },
            } = await fetcher<StartLoginResponseData>({
                method: 'POST',
                url: '/authentication/with-firebase/login/options',
                body: { username } satisfies StartLoginRequestData,
            });

            logger.info('/authentication/with-firebase/login/options', { publicKeyOptions });

            const result = await startAuthentication(publicKeyOptions);

            logger.info('Authentication result:', result);

            const { data } = await fetcher<VerifyLoginResponseData>({
                method: 'POST',
                url: '/authentication/with-firebase/login/verify',
                body: {
                    authenticationResponse: result,
                } satisfies VerifyLoginRequestData,
            });

            logger.info('/authentication/with-firebase/login/verify', { data });

            await signInWithCustomToken(auth(), data.customToken);

            // NOTE: The Authorization header with ID token is set in request inceptor in AuthProvider.tsx component.

            redirect('/passkeys');
        } catch (error) {
            const parsedError = await parseWebAuthnError(error);

            setError('root', {
                message: parsedError.message,
            });

            logger.error(error);
        }
    };
}
