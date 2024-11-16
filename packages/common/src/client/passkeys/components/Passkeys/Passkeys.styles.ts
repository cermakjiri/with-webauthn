import { styled } from '~client/ui-kit';

export const PasskeysHeader = styled('header')(({ theme }) => ({
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: 'grid',
    justifyContent: 'space-between',
    alignItems: 'center',
    gridTemplateColumns: 'auto auto',
}));

export const PasskeysList = styled('section')(({ theme }) => ({
    display: 'grid',
    rowGap: theme.spacing(3.5),
}));
