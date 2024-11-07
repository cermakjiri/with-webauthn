import { forwardRef, type ComponentProps, type ReactNode } from 'react';

import { IconWrapper } from './Icon.styles';

export interface IconProps extends ComponentProps<typeof IconWrapper> {
    icon: (props?: any) => ReactNode;
    className?: string;
}

export const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon({ icon: IconComponent, ...rest }, ref) {
    return (
        <IconWrapper ref={ref} {...rest}>
            <IconComponent />
        </IconWrapper>
    );
});
