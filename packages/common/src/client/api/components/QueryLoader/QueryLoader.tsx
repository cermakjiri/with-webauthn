import type { ReactNode } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';

import { Loader, LoaderContainer, type LoaderContainerHeight } from '~client/ui-kit';

export interface QueryLoaderProps {
    children: ReactNode | ReactNode[];
    result: UseQueryResult | UseQueryResult[];
    height?: LoaderContainerHeight;
}

export const isLoading = (result: UseQueryResult) => result.isFetching;

export function isAnyResultLoading(results: UseQueryResult | UseQueryResult[]) {
    return Array.isArray(results) ? results.some(isLoading) : isLoading(results);
}

export const QueryLoader = ({ result, children, height }: QueryLoaderProps) => {
    if (isAnyResultLoading(result)) {
        return (
            <LoaderContainer height={height}>
                <Loader />
            </LoaderContainer>
        );
    }

    return <>{children}</>;
};
