import { Button } from '~client/ui-kit';
import { RefreshOutlined } from '~client/ui-kit/icons';

import type { QueryErrorProps } from '../QueryError';
import { isAnyResultLoading } from '../QueryLoader';

export interface RefetchButtonProps {
    result: QueryErrorProps['result'];
}

export const RefetchButton = ({ result }: RefetchButtonProps) => {
    return (
        <Button
            variant='outlined'
            color='error'
            onClick={() => {
                if (Array.isArray(result)) {
                    result.forEach(r => r.refetch());
                } else {
                    result.refetch();
                }
            }}
            loading={isAnyResultLoading(result)}
            startIcon={<RefreshOutlined />}
            sx={{
                whiteSpace: 'nowrap',
            }}
        >
            Retry
        </Button>
    );
};
