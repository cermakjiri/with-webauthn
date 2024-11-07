import { createContext, createElement, useContext, useState, type ReactElement, type ReactNode } from 'react';

export type Pathname = string;
export type RenderRoute = () => ReactElement;
export type UnknownRoutes = Readonly<Record<Pathname, RenderRoute>>;

export function createExampleRouter<Routes extends UnknownRoutes>() {
    type Route = keyof Routes;

    type ExampleRouterContextValue = {
        routes: Routes;
        currentRoute: Route;
        redirect: (route: Route) => void;
    };

    const ExampleRouterContext = createContext<ExampleRouterContextValue | undefined>(undefined);

    interface ExampleRouterProps {
        children: ReactNode;
        initialRoute: Route;
        routes: Routes;
    }

    const ExampleRouter = ({ children, initialRoute, routes }: ExampleRouterProps) => {
        const [currentRoute, setCurrentRoute] = useState<keyof Routes>(initialRoute);

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

        return createElement(routes[currentRoute]);
    }

    return {
        ExampleRouter,
        useExampleRouter,
        CurrentExampleRoute,
    } as const;
}
