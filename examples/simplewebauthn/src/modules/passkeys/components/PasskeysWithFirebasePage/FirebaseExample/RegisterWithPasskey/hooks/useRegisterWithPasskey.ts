import { startRegistration } from '@simplewebauthn/browser';
import { signInWithCustomToken } from 'firebase/auth';

import { logger } from '~logger';
import { fetcher } from '~modules/api/fetcher';
import { auth } from '~modules/firebase/config';
import type { FormProps } from '~modules/form/components';
import { parseWebAuthnError } from '~modules/passkeys/utils';
import type {
    StartRegistrationRequestData,
    StartRegistrationResponseData,
} from '~pages/api/authentication/with-firebase/register/options';
import type {
    VerifyRegistrationRequestData,
    VerifyRegistrationResponseData,
} from '~pages/api/authentication/with-firebase/register/verify';

import { useExampleRouter } from '../../ExampleRouter';
import type { RegisterFormSchema, RegisterFormValues } from '../schema';

export function useRegisterWithPasskey(): FormProps<RegisterFormSchema, RegisterFormValues>['onSubmit'] {
    const { redirect } = useExampleRouter();

    return async function registerPasskey({ email: username }, { setError }) {
        try {
            const {
                data: { publicKeyOptions },
            } = await fetcher<StartRegistrationResponseData>({
                method: 'POST',
                url: '/authentication/with-firebase/register/options',
                body: { username } satisfies StartRegistrationRequestData,
            });

            logger.info('/authentication/with-firebase/register/options', { publicKeyOptions, username });

            const result = await startRegistration({
                optionsJSON: publicKeyOptions,
            });

            logger.info('Registration result', result);

            const { data } = await fetcher<VerifyRegistrationResponseData>({
                method: 'POST',
                url: '/authentication/with-firebase/register/verify',
                body: {
                    registrationResponse: result,
                } satisfies VerifyRegistrationRequestData,
            });

            logger.info('/authentication/with-firebase/register/verify', { data });

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
