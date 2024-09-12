import { styled } from '@workspace/ui';

export const Topbar = styled('section')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '44px 1fr 44px',
    columnGap: theme.spacing(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2.5, 2),
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
}));
