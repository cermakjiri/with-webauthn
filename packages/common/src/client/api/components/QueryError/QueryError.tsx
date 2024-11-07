import type { ReactNode } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';

import { Alert, type AlertProps } from '~client/ui-kit';

import { RefetchButton } from '../RefetchButton';

export interface QueryErrorProps extends Omit<AlertProps, 'title' | 'severity'> {
    children?: ReactNode | ReactNode[];
    result: UseQueryResult | UseQueryResult[];
    message: string;
}

function getError(result: QueryErrorProps['result']) {
    if (Array.isArray(result)) {
        return result.find(r => r.error) ?? null;
    }

    return result.error ?? null;
}

export const QueryError = ({ result, children = null, ...rest }: QueryErrorProps) => {
    if (getError(result)) {
        return (
            <Alert severity='error' sx={{ p: 2 }} action={<RefetchButton result={result} />} {...rest}>
                {rest.message}
            </Alert>
        );
    }

    return <>{children}</>;
};
