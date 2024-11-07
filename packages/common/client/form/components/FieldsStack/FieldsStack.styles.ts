import { styled } from '~client/ui-kit';

export const FieldsStack = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    rowGap: theme.spacing(3),
}));
