import { startRegistration } from '@simplewebauthn/browser';
import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@workspace/common/client/api/components';
import { fetcher } from '@workspace/common/client/api/fetcher';
import { parseUnknownError } from '@workspace/common/client/errors';
import { track } from '@workspace/common/client/firebase/analytics';
import { useSnack } from '@workspace/common/client/snackbar/hooks';
import { logger } from '@workspace/common/logger';

import type { StartLinkingResponseData } from '~pages/api/webauthn/link/options';
import type { VerifyLinkResponseData } from '~pages/api/webauthn/link/verify';

import { reauthenticate } from '../utils/reauthenticate';

export function useAddPasskey() {
    const snack = useSnack();

    return useMutation({
        mutationFn: async () => {
            track('example_upgrade_add_passkey_request');
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
        async onError(error: Error) {
            const parsedError = await parseUnknownError(error);

            logger.error(parsedError);

            snack('error', parsedError.message);
            track('example_upgrade_add_passkey_failure');
        },
        onSuccess() {
            snack('success', 'Passkey has been successfully added.');
            track('example_upgrade_add_passkey_success');
        },
    });
}
