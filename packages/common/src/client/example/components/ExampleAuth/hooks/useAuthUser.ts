import { useExampleAuthSession } from './useExampleAuthSession';

export function useAuthUser() {
    const {
        session: { authUser },
    } = useExampleAuthSession();

    return authUser;
}
