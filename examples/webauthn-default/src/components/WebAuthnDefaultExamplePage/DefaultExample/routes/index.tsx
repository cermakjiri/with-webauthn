import type { UnknownRoutes } from '@workspace/common/client/example/components';

import { LoginWithPasskey } from '../LoginWithPasskey';
import { Passkeys } from '../Passkeys';
import { RegisterWithPasskey } from '../RegisterWithPasskey';

export const exampleRoutes = {
    '/register': () => <RegisterWithPasskey />,
    '/login': () => <LoginWithPasskey />,
    '/passkeys': () => <Passkeys />,
} as const satisfies UnknownRoutes;

export type ExampleRoutes = typeof exampleRoutes;
export type ExampleRoute = keyof ExampleRoutes;
