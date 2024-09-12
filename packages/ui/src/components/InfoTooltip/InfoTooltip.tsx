import type { ReactNode } from 'react';
import { InfoOutlined } from '@mui/icons-material';
import type { TooltipProps } from '@mui/material';

import { Icon, type IconProps } from '../Icon';
import { Words } from '../Words';
import { StyledTooltip } from './InfoTooltip.styles';

export interface InfoTooltipProps extends Omit<TooltipProps, 'title' | 'children'> {
    title: ReactNode;
    icon?: IconProps['icon'];
    children?: ReactNode;
}

export const InfoTooltip = ({ title, children, icon = InfoOutlined, ...props }: InfoTooltipProps) => {
    return (
        <StyledTooltip
            enterTouchDelay={0}
            leaveTouchDelay={60 * 60_000}
            {...props}
            title={
                <Words variant='caption' sx={{ textWrap: 'pretty' }}>
                    {title}
                </Words>
            }
        >
            {children ? (
                <div>{children}</div>
            ) : (
                <Icon
                    icon={icon}
                    sx={theme => ({
                        color: theme.palette.text.secondary,
                        height: '1.25rem',
                        cursor: 'help',
                    })}
                />
            )}
        </StyledTooltip>
    );
};
