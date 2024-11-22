import { sendEmailVerification, signInWithCustomToken, type User } from 'firebase/auth';

import { fetcher } from '@workspace/common/client/api/fetcher';
import { parseUnknownError } from '@workspace/common/client/errors';
import { auth } from '@workspace/common/client/firebase/config';
import type { FormProps } from '@workspace/common/client/form/components';
import { useSnack } from '@workspace/common/client/snackbar/hooks';
import { logger } from '@workspace/common/logger';

import type { RegisterRequestData, RegisterResponseData } from '~pages/api/auth/register';

import { useExampleRouter } from '../../DefaultExampleRouter';
import type { RegisterFormSchema, RegisterFormValues } from '../schema';

async function sendUserEmailVerification(user: User) {
    const returnUrl = new URL('/', window.location.origin);

    returnUrl.searchParams.set('verified', 'true');
    returnUrl.searchParams.set('email', user.email!);

    await sendEmailVerification(user, {
        handleCodeInApp: true,
        url: returnUrl.toString(),
    });
}

export function useRegisterWithEmailAndPassword(): FormProps<RegisterFormSchema, RegisterFormValues>['onSubmit'] {
    const { redirect } = useExampleRouter();
    const snack = useSnack();

    return async function registerPasskey({ email, password }, { setError, reset }) {
        try {
            const {
                data: { customToken },
            } = await fetcher<RegisterResponseData>({
                method: 'POST',
                url: '/auth/register',
                body: { email, password } satisfies RegisterRequestData,
            });

            const { user } = await signInWithCustomToken(auth(), customToken);

            if (!user.emailVerified) {
                await sendUserEmailVerification(user);
            } else {
                redirect('/passkeys');
            }

            reset();

            snack(
                'success',
                <>
                    User created.
                    {!user.emailVerified && (
                        <>
                            <br />
                            Please check your inbox and click on the email verification link.
                        </>
                    )}
                </>,
            );
        } catch (error) {
            const parsedError = await parseUnknownError(error);

            setError('root', {
                message: parsedError.message,
            });

            logger.error(error);
        }
    };
}
