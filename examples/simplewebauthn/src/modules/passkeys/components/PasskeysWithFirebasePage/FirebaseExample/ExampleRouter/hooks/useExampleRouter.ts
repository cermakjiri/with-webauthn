import { useContext } from 'react';

import { ExampleRouterContext } from '../context';

export function useExampleRouter() {
    const context = useContext(ExampleRouterContext);

    if (!context) {
        throw new Error('useExampleRouter must be used within an ExampleRouterContext.Provider');
    }

    return context;
}
