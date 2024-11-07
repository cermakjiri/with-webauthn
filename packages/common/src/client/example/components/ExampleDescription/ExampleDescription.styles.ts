import { styled } from '@mui/material';

import { Words } from '../../../ui-kit/components/Words';

export const Features = styled('ul')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    rowGap: theme.spacing(1),
    listStyle: 'inside',
    padding: 0,
    margin: 0,
}));

export const Feature = styled(Words)(({ theme }) => ({
    textWrap: 'balance',
    lineHeight: 1.65,
}));
