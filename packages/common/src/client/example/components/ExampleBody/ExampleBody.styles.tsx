import { styled } from '~client/ui-kit';

export const ExampleBody = styled('section')(({ theme }) => ({
    padding: theme.spacing(3),
    position: 'relative',
    overflowY: 'auto',
    maxWidth: 550,
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
}));
