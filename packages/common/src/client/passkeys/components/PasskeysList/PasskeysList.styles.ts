import { styled } from '@mui/material';

export const List = styled('section')(({ theme }) => ({
    display: 'grid',
    rowGap: theme.spacing(3.5),
}));
