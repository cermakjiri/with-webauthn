import { CircularProgress, styled } from '@mui/material';

export type LoaderContainerHeight = 'fullPage' | 'fullBox' | number;

export const LoaderContainer = styled('div')<{ height?: LoaderContainerHeight }>(({ theme, height }) => ({
    width: '100%',
    margin: 'auto',

    ...(typeof height === 'undefined' && {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    }),

    ...(typeof height === 'number' && {
        height: theme.spacing(height),
        maxWidth: theme.spacing(42),
    }),

    ...(height === 'fullBox' && {
        height: '100%',
        minHeight: theme.spacing(32),
        maxWidth: theme.spacing(42),
    }),

    ...(height === 'fullPage' && {
        height: `calc(100% - 72px)`,
        position: 'absolute',
    }),

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

export const StyledLoader = styled(CircularProgress)(({ theme }) => ({
    color: theme.palette.primary.main,
}));
