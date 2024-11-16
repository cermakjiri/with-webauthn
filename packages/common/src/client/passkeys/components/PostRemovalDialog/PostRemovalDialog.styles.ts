import { styled } from '~client/ui-kit';

export const PasskeyDetails = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    columnGap: theme.spacing(1),
    rowGap: theme.spacing(0.75),
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 'auto',
}));
