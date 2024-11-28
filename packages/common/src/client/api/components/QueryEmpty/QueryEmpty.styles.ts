import { styled } from '@mui/material';

export const Empty = styled('section')(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(3),
}));
