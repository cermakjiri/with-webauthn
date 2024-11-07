import { Icon as MUIIcon, styled } from '@mui/material';

export const IconWrapper = styled(MUIIcon)(({ theme }) => ({
    color: 'currentColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: theme.spacing(3),
    width: theme.spacing(3),

    '& > svg': {
        width: '100%',
        height: '100%',
    },
}));
