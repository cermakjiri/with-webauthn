import { startRegistration } from '@simplewebauthn/browser';
import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@workspace/common/client/api/components';
import { fetcher } from '@workspace/common/client/api/fetcher';
import { useSnack } from '@workspace/common/client/snackbar/hooks';
import { logger } from '@workspace/common/logger';

import type { StartLinkingResponseData } from '~pages/api/webauthn/link/options';
import type { VerifyLinkResponseData } from '~pages/api/webauthn/link/verify';

import { reauthenticate } from '../utils/reauthenticate';

export function useAddPasskey() {
    const snack = useSnack();

    return useMutation({
        mutationFn: async () => {
            const {
                data: { publicKeyOptions },
            } = await fetcher<StartLinkingResponseData>({
                method: 'GET',
                url: '/webauthn/link/options',
            });

            logger.info('/webauthn/link/options', publicKeyOptions);

            const result = await startRegistration({
                optionsJSON: publicKeyOptions,
            });

            logger.info('Registration result:', result);

            const {
                data: { customToken },
            } = await fetcher<VerifyLinkResponseData>({
                method: 'POST',
                url: '/webauthn/link/verify',
                body: {
                    registrationResponse: result,
                },
            });

            await reauthenticate(customToken);

            await queryClient.invalidateQueries({
                queryKey: ['passkeys'],
            });
        },
        onError(error: Error) {
            snack('error', error.message);
        },
        onSuccess() {
            snack('success', 'Passkey has been successfully added.');
        },
    });
}
