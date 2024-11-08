import { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { api } from '~client/api/fetcher';
import { auth } from '~client/firebase/config';

import { AuthContext, type AuthSession } from './contexts';

export interface AuthProviderProps {
    children: React.ReactNode;
    Loader?: React.ComponentType;
}

export const AuthProvider = ({ children, Loader = () => null }: AuthProviderProps) => {
    const [session, setSession] = useState<AuthSession>({
        state: 'loading',
        authUser: null,
    });

    const interceptorId = useRef<null | number>(null);

    useEffect(() => {
        return onAuthStateChanged(auth(), async user => {
            if (user) {
                interceptorId.current = api().interceptors.request.use(undefined, async request => {
                    const idToken = await user.getIdToken();

                    request.headers.set('Authorization', `Bearer ${idToken}`);

                    return request;
                });

                setSession({
                    authUser: user,
                    state: 'authenticated',
                });
            } else {
                if (interceptorId.current) {
                    api().interceptors.request.eject(interceptorId.current);
                }

                setSession({
                    authUser: null,
                    state: 'unauthenticated',
                });
            }
        });
    }, []);

    if (!session || session.state === 'loading') {
        return <Loader />;
    }

    return <AuthContext.Provider value={{ session, setSession }}>{children}</AuthContext.Provider>;
};
