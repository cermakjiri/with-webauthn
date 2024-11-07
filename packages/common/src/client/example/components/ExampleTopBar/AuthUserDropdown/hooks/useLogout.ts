import { useMutation } from '@tanstack/react-query';

import { auth } from '~client/firebase/config';

export function useLogout(onSuccess?: () => void) {
    return useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => {
            await auth().signOut();
        },
        onSuccess,
    });
}
