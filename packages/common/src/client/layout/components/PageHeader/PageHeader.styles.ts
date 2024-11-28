import { Container, Icon, styled, Words } from '~client/ui-kit';

export const StyledContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: `${theme.spacing(1)} !important`,
    paddingRight: `${theme.spacing(1)} !important`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const LeftSide = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gap: theme.spacing(1),
    alignItems: 'center',
}));

export const PageTitle = styled(Words)(({ theme }) => ({
    fontSize: '1.75rem',

    [theme.breakpoints.down('sm')]: {
        fontSize: theme.typography.h3.fontSize,
    },
}));

export const IconGithub = styled(Icon)(({ theme }) => ({
    color: '#000',
    height: 32,
    width: 32,
}));
