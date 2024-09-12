import { Card as MUICard, styled } from '@mui/material';

export const Card = styled(MUICard)(({ theme }) => ({
    boxShadow: 'none',
    border: `1px solid ${theme.palette.grey[300]}`,
}));
