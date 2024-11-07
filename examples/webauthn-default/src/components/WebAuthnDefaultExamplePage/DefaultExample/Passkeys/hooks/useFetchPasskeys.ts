import { useQuery } from '@tanstack/react-query';

import { useAuthUser } from '@workspace/common/client/example/components';
import { fetchUserPasskeys } from '@workspace/common/client/firebase/services/passkeys';

export function useFetchPasskeys() {
    const authUser = useAuthUser();
    const uid = authUser!.uid;

    return useQuery({
        queryKey: ['passkeys', uid],
        queryFn: () => fetchUserPasskeys(uid),
        initialData: [],
    });
}
