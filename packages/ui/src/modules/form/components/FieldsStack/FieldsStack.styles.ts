import { styled } from '@mui/material';

export const FieldsStack = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    rowGap: theme.spacing(3),
}));
