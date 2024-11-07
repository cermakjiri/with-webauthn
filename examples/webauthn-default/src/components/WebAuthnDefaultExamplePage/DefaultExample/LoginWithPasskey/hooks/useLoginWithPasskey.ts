import { startAuthentication } from '@simplewebauthn/browser';
import { signInWithCustomToken } from 'firebase/auth';

import { fetcher } from '@workspace/common/client/api/fetcher';
import { auth } from '@workspace/common/client/firebase/config';
import type { FormProps } from '@workspace/common/client/form/components';
import { parseWebAuthnError } from '@workspace/common/client/webauthn/utils';
import { logger } from '@workspace/common/logger';

import type { StartLoginRequestData, StartLoginResponseData } from '~pages/api/webauthn/login/options';
import type { VerifyLoginRequestData, VerifyLoginResponseData } from '~pages/api/webauthn/login/verify';

import { useExampleRouter } from '../../DefaultExampleRouter';
import type { LoginFormSchema, LoginFormValues } from '../schema';

export function useLoginWithPasskey(): FormProps<LoginFormSchema, LoginFormValues>['onSubmit'] {
    const { redirect } = useExampleRouter();

    return async function loginWithPasskey({ email: username }, { setError }) {
        try {
            const {
                data: { publicKeyOptions },
            } = await fetcher<StartLoginResponseData>({
                method: 'POST',
                url: '/webauthn/login/options',
                body: { username } satisfies StartLoginRequestData,
            });

            logger.info('/webauthn/login/options', { publicKeyOptions });

            const result = await startAuthentication({
                optionsJSON: publicKeyOptions,
            });

            logger.info('Authentication result:', result);

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
            const parsedError = await parseWebAuthnError(error);

            setError('root', {
                message: parsedError.message,
            });

            logger.error(error);
        }
    };
}
