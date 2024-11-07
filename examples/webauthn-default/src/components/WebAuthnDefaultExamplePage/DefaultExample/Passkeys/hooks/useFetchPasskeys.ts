import { useQuery } from '@tanstack/react-query';

import { useAuthUser } from '@workspace/common/client/example/components';
import { getPasskeys } from '@workspace/common/server/services/passkeys';

export function useFetchPasskeys() {
    const authUser = useAuthUser();
    const uid = authUser!.uid;

    return useQuery({
        queryKey: ['passkeys', uid],
        queryFn: async () => getPasskeys(uid),
        initialData: [],
    });
}
