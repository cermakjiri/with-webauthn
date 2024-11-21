import type { ReactNode } from 'react';
import type { RequestResult } from '@ackee/antonio-core';
import { Refresh } from '@mui/icons-material';
import type { UseQueryResult } from '@tanstack/react-query';

import { Button, Icon, Words, type AlertProps } from '~client/ui-kit';

import { isAnyResultLoading } from '../QueryLoader';
import { Empty } from './QueryEmpty.styles';

type Result = UseQueryResult<any | any[] | RequestResult<any | any[]>>;

export interface QueryEmptyProps<T extends Result | Result[]> extends Omit<AlertProps, 'severity' | 'title'> {
    children: React.ReactNode;
    result: T;
    message: ReactNode;
    isEmpty?: (result: T) => boolean;
    retry?: boolean;
}

const isResultEmpty = (result: Result) => {
    const isEmptyArray = Array.isArray(result.data) && result.data.length === 0;
    const isEmptyObject = !Array.isArray(result.data) && !result.data;

    return result.status === 'success' && result.data && (isEmptyArray || isEmptyObject);
};

const isAnyEmpty = (results: Result | Result[]) => {
    return Array.isArray(results) ? results.some(isResultEmpty) : isResultEmpty(results);
};

export const QueryEmpty = <T extends Result | Result[]>({
    children,
    result,
    message,
    isEmpty = isAnyEmpty,
    retry = false,
    ...rest
}: QueryEmptyProps<T>) => {
    if (isEmpty(result)) {
        return (
            <Empty {...rest} role='contentinfo'>
                <Words component='p' variant='body2' sx={theme => ({ color: theme.palette.text.secondary })}>
                    {message}
                </Words>
                {retry && (
                    <Button
                        variant='text'
                        size='small'
                        onClick={() => {
                            if (Array.isArray(result)) {
                                result.forEach(r => r.refetch());
                            } else {
                                result.refetch();
                            }
                        }}
                        loading={isAnyResultLoading(result)}
                        startIcon={<Icon icon={Refresh} />}
                        sx={{
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Retry
                    </Button>
                )}
            </Empty>
        );
    }

    return <>{children}</>;
};
