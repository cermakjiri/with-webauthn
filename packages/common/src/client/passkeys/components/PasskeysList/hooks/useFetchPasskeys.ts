import { useQuery } from '@tanstack/react-query';

import { useAuthUser } from '~client/example/components';
import { fetchUserPasskeys } from '~client/firebase/services/passkeys';

export function useFetchPasskeys() {
    const authUser = useAuthUser();
    const uid = authUser?.uid;

    return useQuery({
        queryKey: ['passkeys', uid],
        queryFn: () => fetchUserPasskeys(uid!),
        initialData: [],
        enabled: Boolean(uid),
    });
}
