import { useExampleAuthSession } from '../../ExampleAuth';
import { useExampleRouter } from '../../ExampleRouter';
import type { ExampleAuthRoute, ExampleRoute } from '../../ExampleRouter/context';

const routeTitles = {
    '/passkeys': 'Registered passkeys',
    '/register': 'Demo Registration',
    '/login': 'Demo Login',
} as const satisfies Record<ExampleRoute | ExampleAuthRoute, string>;

export function useExampleRouteTitle() {
    const { session } = useExampleAuthSession();
    const { route } = useExampleRouter();

    if (session.state === 'loading') {
        return 'Loading...';
    }

    return routeTitles[route];
}
