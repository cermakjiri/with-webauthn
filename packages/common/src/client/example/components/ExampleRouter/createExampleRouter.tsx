import { createContext, createElement, useContext, useState, type ReactElement, type ReactNode } from 'react';

export type Pathname = string;
export type RenderRouteComponent = () => ReactElement;
export type UnknownRoutes = Readonly<Record<Pathname, RenderRouteComponent>>;

export type ExampleRouterContextValue<Routes extends UnknownRoutes> = {
    routes: Routes;
    currentRoute: keyof Routes;
    redirect: (route: keyof Routes) => void;
};

export interface ExampleRouterProps<Routes extends UnknownRoutes> {
    children: ReactNode;
    initialRoute: keyof Routes;
    routes: Routes;
}

export function createExampleRouter<Routes extends UnknownRoutes>() {
    type Route = keyof Routes;

    const ExampleRouterContext = createContext<ExampleRouterContextValue<Routes> | undefined>(undefined);

    const ExampleRouter = ({ children, initialRoute, routes }: ExampleRouterProps<Routes>) => {
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
