import { useEffect } from 'react';

import { useExampleAuthSession } from '@workspace/common/client/example/components';

import { useExampleRouter } from '../router';

export const ResolveInitRoute = () => {
    const { currentRoute, redirect } = useExampleRouter();
    const { session } = useExampleAuthSession();

    useEffect(() => {
        if (currentRoute !== null) {
            return;
        }

        switch (session.state) {
            case 'authenticated':
                redirect('/passkeys');
                break;
            case 'unauthenticated':
                redirect('/register');
                break;
        }
    }, [session, currentRoute, redirect]);

    return null;
};
