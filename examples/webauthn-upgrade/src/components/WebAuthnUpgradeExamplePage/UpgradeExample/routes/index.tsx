import type { UnknownRoutes } from '@workspace/common/client/example/components';

import { LoginWithEmailAndPasswordPage } from '../LoginWithEmailAndPasswordPage';
import { LoginWithPasskeyPage } from '../LoginWithPasskeyPage';
import { PasskeysPage } from '../PasskeysPage';
import { RegisterWithEmailAndPasswordPage } from '../RegisterWithEmailAndPasswordPage';

export const exampleRoutes = {
    '/register': RegisterWithEmailAndPasswordPage,
    '/login': LoginWithPasskeyPage,
    '/login-with-password': LoginWithEmailAndPasswordPage,
    '/passkeys': PasskeysPage,
} as const satisfies UnknownRoutes;

export type ExampleRoutes = typeof exampleRoutes;
export type ExampleRoute = keyof ExampleRoutes;
