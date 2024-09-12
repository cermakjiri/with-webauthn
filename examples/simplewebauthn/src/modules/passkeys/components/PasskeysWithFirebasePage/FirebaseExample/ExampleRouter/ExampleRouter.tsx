import { useState, type ReactNode } from 'react';

import { useExampleAuthSession } from '../ExampleAuth';
import { ExampleRouterContext, type ExampleAuthRoute, type ExampleRoute } from './context';

export interface ExampleRouterProps {
    children: ReactNode;
    initialRoute?: ExampleRoute | ExampleAuthRoute;
}

/**
 * Yes, this not so smart solution but it's just an example, so please focus on the WebAutn part. Thanks.
 */
export const ExampleRouter = ({ children }: ExampleRouterProps) => {
    const { session } = useExampleAuthSession();
    const [route, redirect] = useState<ExampleRoute | ExampleAuthRoute>(
        session.state === 'authenticated' ? '/passkeys' : '/register',
    );

    return <ExampleRouterContext.Provider value={{ route, redirect }}>{children}</ExampleRouterContext.Provider>;
};
