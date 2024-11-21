import type { UnknownRoutes } from '@workspace/common/client/example/components';

import { LoginWithPasskeyPage } from '../LoginWithPasskeyPage';
import { PasskeysPage } from '../PasskeysPage';
import { RegisterWithPasskeyPage } from '../RegisterWithPasskeyPage';

export const exampleRoutes = {
    '/register': RegisterWithPasskeyPage,
    '/login': LoginWithPasskeyPage,
    '/passkeys': PasskeysPage,
} as const satisfies UnknownRoutes;

export type ExampleRoutes = typeof exampleRoutes;
export type ExampleRoute = keyof ExampleRoutes;
