import { startAuthentication } from '@simplewebauthn/browser';
import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@workspace/common/client/api/components';
import { fetcher } from '@workspace/common/client/api/fetcher';
import { useAuthUser } from '@workspace/common/client/example/components';
import type { PostRemovalDialogProps } from '@workspace/common/client/passkeys/components';
import { useSnack } from '@workspace/common/client/snackbar/hooks';
import { logger } from '@workspace/common/logger';
import type { Passkey } from '@workspace/common/types';

import type { StartRemovalResponseData } from '~pages/api/webauthn/remove/options';
import type { VerifyRemovalRequestData } from '~pages/api/webauthn/remove/verify';

/**
 * Remove a passkey from the user's account. User must verify their identity before removing the passkey.
 */
export function useRemovePasskey(openDialog: (data: PostRemovalDialogProps['data']) => void) {
    const snack = useSnack();
    const authUser = useAuthUser();

    return useMutation({
        mutationFn: async (passkeyId: string) => {
            try {
                const {
                    data: { publicKeyOptions },
                } = await fetcher<StartRemovalResponseData>({
                    method: 'GET',
                    url: '/webauthn/remove/options',
                });

                logger.info('/webauthn/remove/options', publicKeyOptions);

                const result = await startAuthentication({
                    optionsJSON: publicKeyOptions,
                });

                logger.info('Authentication result:', result);

                const { data: passkey } = await fetcher<Passkey>({
                    method: 'POST',
                    url: '/webauthn/remove/verify',
                    body: {
                        authenticationResponse: result,
                        passkeyId,
                    } satisfies VerifyRemovalRequestData,
                });

                if (passkey.provider) {
                    openDialog({
                        provider: passkey.provider,
                        rpId: passkey.rpId,
                        username: authUser?.email!,
                    });
                }

                await queryClient.invalidateQueries({
                    queryKey: ['passkeys'],
                });
            } catch (error) {
                snack('error', (error as Error).message);
            }
        },
    });
}