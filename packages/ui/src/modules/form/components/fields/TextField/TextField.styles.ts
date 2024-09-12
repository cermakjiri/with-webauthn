import { styled } from '@mui/material';

export const StyledContainer = styled('div', {
    shouldForwardProp: prop => prop !== 'fullWidth',
})<{ fullWidth?: boolean }>(({ fullWidth }) => ({
    width: fullWidth ? '100%' : 'auto',
}));

export const InputContainer = styled(StyledContainer)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));
