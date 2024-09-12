import { Box, styled } from '@mui/material';

export const CategoryFeatures = styled(Box)(({ theme }) => ({
    display: 'grid',
    justifyContent: 'center',

    [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: '1fr 5fr',
        gap: theme.spacing(3),
    },

    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
        gap: theme.spacing(2),
    },
}));
