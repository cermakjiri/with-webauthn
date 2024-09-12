import { styled } from '@workspace/ui';

export const Row = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: theme.spacing(1),
    alignItems: 'center',
}));
