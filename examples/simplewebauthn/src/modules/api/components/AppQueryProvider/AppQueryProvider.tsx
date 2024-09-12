import type { ReactNode } from 'react';
import { HydrationBoundary, MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { env } from '~env';
import { logger } from '~logger';

export interface AppQueryProviderProps {
    children: ReactNode;
    dehydratedState: unknown;
}

/**
 * Why is it used directly, outside of AppQueryProvider?
 * Because of this issue: https://github.com/TanStack/query/issues/1575.
 * The `resetQueries` method thrown this error when used within `QueryClientProvider`.
 */
export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError(error) {
            logger.error(error);
        },
    }),
    mutationCache: new MutationCache({
        onError(error) {
            logger.error(error);
        },
    }),
    defaultOptions: {
        queries: {
            refetchOnReconnect(query) {
                return query.state.status !== 'pending';
            },
            refetchOnMount(query) {
                return query.state.status !== 'pending';
            },
            refetchOnWindowFocus: false,
            retry: failureCount => {
                if (env.NEXT_PUBLIC_DEV_RETRY_QUERIES === 'false') {
                    return false;
                }

                return failureCount < 3;
            },
        },
    },
});

export function AppQueryProvider({ children, dehydratedState }: AppQueryProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
        </QueryClientProvider>
    );
}
