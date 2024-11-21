import type { ReactNode } from 'react';

import { createExampleRouter, useExampleAuthSession } from '@workspace/common/client/example/components';

import type { ExampleRoutes } from '../routes';

const { ExampleRouter, useExampleRouter, CurrentExampleRoute } = createExampleRouter<ExampleRoutes>();

export interface DefaultExampleRouterProps {
    children: ReactNode;
    routes: ExampleRoutes;
}

/**
 * Yes, this not so smart solution but it's just an example, so please focus on the WebAutn part. Thanks.
 */
export const DefaultExampleRouter = ({ children, routes }: DefaultExampleRouterProps) => {
    const { session } = useExampleAuthSession();

    return (
        <ExampleRouter initialRoute={session.state === 'authenticated' ? '/passkeys' : '/register'} routes={routes}>
            {children}
        </ExampleRouter>
    );
};

export { CurrentExampleRoute, useExampleRouter };
