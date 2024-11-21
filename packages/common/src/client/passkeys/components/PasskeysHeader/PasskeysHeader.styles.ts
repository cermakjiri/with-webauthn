import { styled } from '~client/ui-kit';

export const Header = styled('header')(({ theme }) => ({
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    display: 'grid',
    justifyContent: 'space-between',
    alignItems: 'center',
    gridTemplateColumns: 'auto auto',
}));
