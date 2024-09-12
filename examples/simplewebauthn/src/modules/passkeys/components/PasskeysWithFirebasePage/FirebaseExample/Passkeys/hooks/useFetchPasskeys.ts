import { useQuery } from '@tanstack/react-query';

import { getPasskeys } from '~modules/firebase/services/passkeys';

import { useAuthUser } from '../../ExampleAuth';

export function useFetchPasskeys() {
    const authUser = useAuthUser();
    const uid = authUser!.uid;

    return useQuery({
        queryKey: ['passkeys', uid],
        queryFn: async () => getPasskeys(uid),
        initialData: [],
    });
}
