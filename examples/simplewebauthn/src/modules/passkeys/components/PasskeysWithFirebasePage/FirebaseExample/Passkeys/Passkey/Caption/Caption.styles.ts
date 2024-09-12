import { styled } from '@workspace/ui';

export const CaptionWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(0.5),
    alignItems: 'center',
    marginBottom: 'auto',
}));
