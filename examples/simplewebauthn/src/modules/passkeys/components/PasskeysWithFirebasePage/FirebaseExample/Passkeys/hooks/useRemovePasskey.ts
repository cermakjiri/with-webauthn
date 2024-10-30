import { startAuthentication } from '@simplewebauthn/browser';
import { useMutation } from '@tanstack/react-query';

import { logger } from '~logger';
import { queryClient } from '~modules/api/components';
import { fetcher } from '~modules/api/fetcher';
import { useSnack } from '~modules/snackbar/hooks';
import type { StartRemovalResponseData } from '~pages/api/authentication/with-firebase/remove/options';
import type { VerifyRemovalRequestData } from '~pages/api/authentication/with-firebase/remove/verify';
import type { Passkey } from '~server/types';

import { useAuthUser } from '../../ExampleAuth';
import type { PostRemovalDialogProps } from '../PostRemovalDialog';

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
                    url: '/authentication/with-firebase/remove/options',
                });

                logger.info('/authentication/with-firebase/remove/options', publicKeyOptions);

                const result = await startAuthentication({
                    optionsJSON: publicKeyOptions,
                });

                logger.info('Authentication result:', result);

                const { data: passkey } = await fetcher<Passkey>({
                    method: 'POST',
                    url: '/authentication/with-firebase/remove/verify',
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
