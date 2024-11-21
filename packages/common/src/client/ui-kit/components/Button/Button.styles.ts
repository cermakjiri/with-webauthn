import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material';

export const StyledButton = styled(LoadingButton)(({ theme, color, variant, size }) => ({
    textTransform: 'none',
    boxShadow: 'none',
    fontSize: '1rem',
    fontWeight: '500',

    ...(size === 'large' && {
        height: 48,
    }),

    ...(color === 'secondary' &&
        variant === 'outlined' && {
            color: theme.palette.text.secondary,
            backgroundColor: theme.palette.common.white,
            borderColor: theme.palette.text.secondary,

            '&:hover': {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.common.white,
                borderColor: theme.palette.text.primary,
            },
        }),
}));
