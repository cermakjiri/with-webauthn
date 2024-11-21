import { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';

import { api } from '~client/api/fetcher';
import { auth } from '~client/firebase/config';

import { AuthContext, type AuthSession } from './contexts';

export interface AuthProviderProps {
    children: React.ReactNode;
    Loader?: React.ComponentType;
}

const hasOnlyEmailProviderWithUnVerifiedEmail = (user: User) => {
    return user.providerData.length === 1 && user.providerData[0].providerId === 'password' && !user.emailVerified;
};

export const AuthProvider = ({ children, Loader = () => null }: AuthProviderProps) => {
    const [session, setSession] = useState<AuthSession>({
        state: 'loading',
        authUser: null,
    });

    const interceptorId = useRef<null | number>(null);

    useEffect(() => {
        return onAuthStateChanged(auth(), async user => {
            if (!user || hasOnlyEmailProviderWithUnVerifiedEmail(user)) {
                if (interceptorId.current) {
                    api().interceptors.request.eject(interceptorId.current);
                }

                setSession({
                    authUser: null,
                    state: 'unauthenticated',
                });

                return;
            }

            interceptorId.current = api().interceptors.request.use(undefined, async request => {
                const idToken = await user.getIdToken();

                request.headers.set('Authorization', `Bearer ${idToken}`);

                return request;
            });

            const idTokenResult = await user.getIdTokenResult();

            setSession({
                authUser: user,
                tokenClaims: idTokenResult.claims,
                state: 'authenticated',
            });
        });
    }, []);

    if (!session || session.state === 'loading') {
        return <Loader />;
    }

    return <AuthContext.Provider value={{ session, setSession }}>{children}</AuthContext.Provider>;
};
