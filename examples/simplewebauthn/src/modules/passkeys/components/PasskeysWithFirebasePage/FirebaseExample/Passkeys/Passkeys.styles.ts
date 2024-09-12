import { Divider, styled } from '@workspace/ui';

export const StyledDivider = styled(Divider)(({ theme }) => ({
    marginTop: theme.spacing(3.5),
    marginBottom: theme.spacing(3.5),
}));

export const DetailsGrid = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    columnGap: theme.spacing(3),
    rowGap: theme.spacing(1.5),
    alignItems: 'center',
    justifyContent: 'flex-start',
}));

export const DetailsRows = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    rowGap: theme.spacing(2.5),
    alignItems: 'center',
    justifyContent: 'flex-start',
}));

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
