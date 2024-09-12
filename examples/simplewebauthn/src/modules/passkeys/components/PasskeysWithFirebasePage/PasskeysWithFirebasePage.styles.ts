import { Container, styled } from '@workspace/ui';

export const FeaturesContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(6),

    display: 'grid',
    gridTemplateColumns: '1fr',
    justifyContent: 'center',
    gap: theme.spacing(5),
}));

export const ExampleWrapper = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(7),
    backgroundColor: theme.palette.grey[100],
}));
