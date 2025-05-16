import { useEffect, useRef, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';

import { api } from '~client/api/fetcher';
import { auth } from '~client/firebase/config';
import { Loader, LoaderContainer } from '~client/ui-kit';
import { logger } from '~logger';

import { AuthContext, type AuthSession } from './contexts';

export interface ExampleAuthProps {
    children: ReactNode;
}

const hasOnlyEmailProviderWithUnVerifiedEmail = (user: User) => {
    return user.providerData.length === 1 && user.providerData[0].providerId === 'password' && !user.emailVerified;
};

export const ExampleAuth = ({ children }: ExampleAuthProps) => {
    const [session, setSession] = useState<AuthSession>({
        state: 'loading',
        authUser: null,
    });

    const interceptorId = useRef<null | number>(null);

    useEffect(() => {
        return onAuthStateChanged(auth(), async user => {
            try {
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
            } catch (error) {
                logger.error(error);
            }
        });
    }, []);

    if (!session || session.state === 'loading') {
        return (
            <LoaderContainer height='fullPage'>
                <Loader />
            </LoaderContainer>
        );
    }

    return <AuthContext.Provider value={{ session, setSession }}>{children}</AuthContext.Provider>;
};
