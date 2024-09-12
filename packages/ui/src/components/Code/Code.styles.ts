import { styled } from '@mui/material';

export const Code = styled('code')(({ theme }) => ({
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(0.25, 0.5),
    color: theme.palette.getContrastText(theme.palette.grey[200]),
    borderRadius: '4px',
    cursor: 'text',
    fontFamily: 'monospace',
}));
