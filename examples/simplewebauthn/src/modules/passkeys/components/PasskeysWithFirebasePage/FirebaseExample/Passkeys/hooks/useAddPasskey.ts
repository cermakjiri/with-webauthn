import { startRegistration } from '@simplewebauthn/browser';
import { useMutation } from '@tanstack/react-query';

import { logger } from '~logger';
import { queryClient } from '~modules/api/components';
import { fetcher } from '~modules/api/fetcher';
import { useSnack } from '~modules/snackbar/hooks';
import type { StartLinkingResponseData } from '~pages/api/authentication/with-firebase/link/options';

export function useAddPasskey() {
    const snack = useSnack();

    return useMutation({
        mutationFn: async () => {
            const {
                data: { publicKeyOptions },
            } = await fetcher<StartLinkingResponseData>({
                method: 'GET',
                url: '/authentication/with-firebase/link/options',
            });

            logger.info('/authentication/with-firebase/link/options', publicKeyOptions);

            const result = await startRegistration({
                optionsJSON: publicKeyOptions,
            });

            logger.info('Registration result:', result);

            await fetcher({
                method: 'POST',
                url: '/authentication/with-firebase/link/verify',
                body: {
                    registrationResponse: result,
                },
            });

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
