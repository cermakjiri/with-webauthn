import { useMutation } from '@tanstack/react-query';

import { auth } from '~modules/firebase/config';

import { useExampleRouter } from '../../../ExampleRouter';

export function useLogout(onSuccess?: () => void) {
    const { redirect } = useExampleRouter();

    return useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => {
            await auth().signOut();

            redirect('/login');
        },
        onSuccess,
    });
}
