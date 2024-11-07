import { ToastContainer } from 'react-toastify';

import { styled } from '~client/ui-kit';

export const SnackbarkContainer = styled(ToastContainer)(({ theme }) => ({
    background: 'transparent',
    border: 0,
    boxShadow: 'none',
    padding: 0,
    width: 'auto !important',
    maxWidth: 450,
    display: 'grid',
    rowGap: theme.spacing(1.25),

    '& .Toastify__toast': {
        background: 'transparent',
        border: 0,
        boxShadow: 'none',
        padding: 0,
        borderRadius: theme.shape.borderRadius,
        marginBottom: 0,
    },

    '& .Toastify__toast-body': {
        padding: 0,
    },

    '& .Toastify__close-button': {
        position: 'relative',
        right: '30px',
        top: '15px',
    },

    '& .Toastify__toast-icon': {
        display: 'none',
    },

    '& .Toastify__progress-bar--wrp': {
        height: 3,
    },

    '& .Toastify__progress-bar--success': {
        backgroundColor: theme.palette.success.main,
    },

    '& .Toastify__progress-bar--error': {
        backgroundColor: theme.palette.error.main,
    },
}));
