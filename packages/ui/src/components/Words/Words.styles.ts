import { styled } from '@mui/material';

export const Strong = styled('span')(({ theme }) => ({
    fontWeight: 700,
    display: 'block',
    marginBottom: theme.spacing(0.5),
}));

export const TextBlock = styled('p')(({ theme }) => ({
    marginBottom: theme.spacing(0.5),
}));

export const Space = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(2.5),
}));
