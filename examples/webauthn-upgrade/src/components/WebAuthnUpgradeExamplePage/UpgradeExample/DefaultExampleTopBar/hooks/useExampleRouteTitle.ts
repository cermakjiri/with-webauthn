import { useExampleAuthSession } from '@workspace/common/client/example/components';

import { useExampleRouter } from '../../DefaultExampleRouter';
import type { ExampleRoute } from '../../routes';

const routeTitles = {
    '/passkeys': 'Registered passkeys',
    '/register': 'Demo Registration',
    '/login': 'Demo Login',
    '/login-with-password': 'Demo Login',
} as const satisfies Record<ExampleRoute, string>;

export function useExampleRouteTitle() {
    const { session } = useExampleAuthSession();
    const { currentRoute } = useExampleRouter();

    if (session.state === 'loading') {
        return 'Loading...';
    }

    return routeTitles[currentRoute];
}