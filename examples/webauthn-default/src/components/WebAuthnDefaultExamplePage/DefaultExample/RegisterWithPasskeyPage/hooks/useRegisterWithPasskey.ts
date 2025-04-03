import { startRegistration } from '@simplewebauthn/browser';
import { signInWithCustomToken } from 'firebase/auth';

import { fetcher } from '@workspace/common/client/api/fetcher';
import { parseUnknownError } from '@workspace/common/client/errors';
import { auth } from '@workspace/common/client/firebase/config';
import type { FormProps } from '@workspace/common/client/form/components';
import { logger } from '@workspace/common/logger';

import type { StartRegistrationRequestData, StartRegistrationResponseData } from '~pages/api/webauthn/register/options';
import type {
    VerifyRegistrationRequestData,
    VerifyRegistrationResponseData,
} from '~pages/api/webauthn/register/verify';

import { useExampleRouter } from '../../router';
import type { RegisterFormSchema, RegisterFormValues } from '../schema';

export function useRegisterWithPasskey(): FormProps<RegisterFormSchema, RegisterFormValues>['onSubmit'] {
    const { redirect } = useExampleRouter();

    return async function registerPasskey({ email: username }, { setError }) {
        try {
            const {
                data: { publicKeyOptions },
            } = await fetcher<StartRegistrationResponseData>({
                method: 'POST',
                url: '/webauthn/register/options',
                body: { username } satisfies StartRegistrationRequestData,
            });

            logger.info('/webauthn/register/options', { publicKeyOptions, username });

            const result = await startRegistration({
                optionsJSON: publicKeyOptions,
            });

            logger.info('Registration result', result);

            const { data } = await fetcher<VerifyRegistrationResponseData>({
                method: 'POST',
                url: '/webauthn/register/verify',
                body: {
                    registrationResponse: result,
                } satisfies VerifyRegistrationRequestData,
            });

            logger.info('/webauthn/register/verify', { data });

            await signInWithCustomToken(auth(), data.customToken);

            // NOTE: The Authorization header with ID token is set in request inceptor in AuthProvider.tsx component.

            redirect('/passkeys');
        } catch (error) {
            const parsedError = await parseUnknownError(error);

            setError('root', {
                message: parsedError.message,
            });

            logger.error(error);
        }
    };
}
