import { createContext } from 'react';

type ValuesOf<T extends object> = T[keyof T];

export const exampleRoutes = {
    register: '/register',
    login: '/login',
} as const satisfies Record<string, string>;

export type ExampleRoute = ValuesOf<typeof exampleRoutes>;

export const exampleAuthRoutes = {
    passkeys: '/passkeys',
} as const satisfies Record<string, string>;

export type ExampleAuthRoute = ValuesOf<typeof exampleAuthRoutes>;

export type ExampleRouterContextValue = {
    route: ExampleRoute | ExampleAuthRoute;
    redirect: (route: ExampleRoute | ExampleAuthRoute) => void;
};

export const ExampleRouterContext = createContext<ExampleRouterContextValue | undefined>(undefined);
