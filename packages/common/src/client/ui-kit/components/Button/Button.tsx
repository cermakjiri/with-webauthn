import type { LoadingButtonProps } from '@mui/lab';

import { StyledButton } from './Button.styles';

export interface ButtonProps extends LoadingButtonProps {}

export const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <StyledButton variant='contained' size='large' {...props}>
            {children}
        </StyledButton>
    );
};
