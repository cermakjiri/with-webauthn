import type { ComponentProps } from 'react';

import { Words } from '../Words';
import { StyledMenuItem } from './MenuItem.styles';

export interface MenuItemProps extends ComponentProps<typeof StyledMenuItem> {
    children: React.ReactNode;
}

export const MenuItem = ({ children, ...props }: MenuItemProps) => {
    return (
        <StyledMenuItem {...props}>
            <Words
                variant='body2'
                sx={theme => ({
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                })}
            >
                {children}
            </Words>
        </StyledMenuItem>
    );
};
