import { styled, Tooltip, tooltipClasses, type TooltipProps } from '@mui/material';

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip
        {...props}
        classes={{
            popper: className,
        }}
    />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        padding: theme.spacing(2),

        [theme.breakpoints.down('sm')]: {
            maxWidth: 'unset',
        },

        [theme.breakpoints.up('sm')]: {
            maxWidth: 600,
        },
    },
}));
