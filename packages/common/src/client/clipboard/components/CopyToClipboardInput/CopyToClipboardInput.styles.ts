import { styled } from '~client/ui-kit';

export const Textarea = styled('textarea')(({ theme }) => ({
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: '4px',
    resize: 'none',
    height: '1rem',
    textWrap: 'nowrap',
    cursor: 'copy',
    fontFamily: 'monospace',
}));
