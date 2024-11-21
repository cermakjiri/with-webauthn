import { startAuthentication } from '@simplewebauthn/browser';
import { signInWithCustomToken } from 'firebase/auth';

import { fetcher } from '@workspace/common/client/api/fetcher';
import { parseUnknownError } from '@workspace/common/client/errors';
import { auth } from '@workspace/common/client/firebase/config';
import type { FormProps } from '@workspace/common/client/form/components';
import { logger } from '@workspace/common/logger';

import type { LoginRequestData, LoginResponseData } from '~pages/api/auth/login';
import type { VerifyLoginRequestData, VerifyLoginResponseData } from '~pages/api/webauthn/login/verify';

import { useExampleRouter } from '../../DefaultExampleRouter';
import type { LoginFormSchema, LoginFormValues } from '../schema';

export function useLoginWithEmailAndPassword(): FormProps<LoginFormSchema, LoginFormValues>['onSubmit'] {
    const { redirect } = useExampleRouter();

    return async function loginWithEmailAndPassword({ email, password }, { setError }) {
        try {
            const { data: loginResult } = await fetcher<LoginResponseData>({
                method: 'POST',
                url: '/auth/login',
                body: { email, password } satisfies LoginRequestData,
            });

            if (!loginResult.mfa) {
                await signInWithCustomToken(auth(), loginResult.customToken);

                redirect('/passkeys');

                return;
            }

            logger.info('/auth/login', loginResult);

            const webAuthnResult = await startAuthentication({
                optionsJSON: loginResult.publicKeyOptions,
            });

            logger.info('WebAuthn API result:', webAuthnResult);

            const { data: webAuthnVerifiedResult } = await fetcher<VerifyLoginResponseData>({
                method: 'POST',
                url: '/webauthn/login/verify',
                body: {
                    authenticationResponse: webAuthnResult,
                } satisfies VerifyLoginRequestData,
            });

            logger.info('/webauthn/login/verify', webAuthnVerifiedResult);

            await signInWithCustomToken(auth(), webAuthnVerifiedResult.customToken);

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
