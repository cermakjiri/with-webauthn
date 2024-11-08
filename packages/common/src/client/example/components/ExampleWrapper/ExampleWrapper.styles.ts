import { styled } from '~client/ui-kit';

export const ExampleWrapper = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(7),
    backgroundColor: theme.palette.grey[100],
}));
