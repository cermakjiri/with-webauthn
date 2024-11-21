import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(6),
}));

export const Frame = styled(Box, {
    shouldForwardProp(propName) {
        return propName !== 'expanded';
    },
})<{ expanded: boolean }>(({ theme, expanded }) => ({
    backgroundColor: theme.palette.common.white,
    margin: 'auto',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    maxWidth: expanded ? '100%' : 420,
    minHeight: expanded ? 750 : 650,
    maxHeight: expanded ? '100%' : 750,
    transition: 'max-width 0.2s, min-height 0.2s',
    willChange: 'contents',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    position: 'relative',
}));
