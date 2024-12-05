import {
    createContext,
    createElement,
    useContext,
    useEffect,
    useState,
    type ReactElement,
    type ReactNode,
} from 'react';

import { track } from '~client/firebase/analytics';
import { Loader, LoaderContainer } from '~client/ui-kit';

export type Pathname = string;
export type RenderRouteComponent = () => ReactElement;
export type UnknownRoutes = Readonly<Record<Pathname, RenderRouteComponent>>;

export type ExampleRouterContextValue<Routes extends UnknownRoutes> = {
    routes: Routes;
    currentRoute: keyof Routes | null;
    redirect: (route: keyof Routes) => void;
};

export interface ExampleRouterProps<Routes extends UnknownRoutes> {
    children: ReactNode;
    routes: Routes;
}

export function createExampleRouter<Routes extends UnknownRoutes>() {
    const ExampleRouterContext = createContext<ExampleRouterContextValue<Routes> | undefined>(undefined);

    const ExampleRouter = ({ children, routes }: ExampleRouterProps<Routes>) => {
        const [currentRoute, setCurrentRoute] = useState<keyof Routes | null>(null);

        return (
            <ExampleRouterContext.Provider value={{ routes, currentRoute, redirect: setCurrentRoute }}>
                {children}
            </ExampleRouterContext.Provider>
        );
    };

    function useExampleRouter() {
        const context = useContext(ExampleRouterContext);

        if (!context) {
            throw new Error('useExampleRouter must be used within an ExampleRouterContext.Provider');
        }

        return context;
    }

    function CurrentExampleRoute() {
        const { routes, currentRoute } = useExampleRouter();

        useEffect(() => {
            if (!currentRoute) {
                return;
            }

            track('example_route_change', { route: currentRoute });
        }, [currentRoute]);

        if (!currentRoute) {
            return (
                <LoaderContainer height='fullBox'>
                    <Loader />
                </LoaderContainer>
            );
        }

        return createElement(routes[currentRoute]);
    }

    return {
        ExampleRouter,
        useExampleRouter,
        CurrentExampleRoute,
    } as const;
}
