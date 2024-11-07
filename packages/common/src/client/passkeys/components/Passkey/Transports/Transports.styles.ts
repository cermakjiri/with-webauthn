import { styled } from '~client/ui-kit';

export const Row = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1.5),
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(0.5),
}));

export const ChipInner = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(0.5),
    alignItems: 'center',
    cursor: 'help',
}));
