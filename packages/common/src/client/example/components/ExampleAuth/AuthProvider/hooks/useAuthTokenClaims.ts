import { useExampleAuthSession } from './useExampleAuthSession';

export function useAuthTokenClaims() {
    const { session } = useExampleAuthSession();

    return session.state === 'authenticated' ? session.tokenClaims : null;
}
