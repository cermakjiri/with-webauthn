import { styled } from '~client/ui-kit';

export const Callout = styled('section')(({ theme }) => ({
    padding: theme.spacing(3),
    // maxWidth: 550,
    width: '100%',
    margin: '2rem 0 6rem',
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
}));
