import { LoadingButton, type LoadingButtonProps } from '@mui/lab';

export interface ButtonProps extends LoadingButtonProps {}

export const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <LoadingButton
            variant='contained'
            size='large'
            {...props}
            sx={{
                textTransform: 'none',
                boxShadow: 'none',
                height: 48,
                fontSize: '1rem',
                fontWeight: '500',
                ...props.sx,
            }}
        >
            {children}
        </LoadingButton>
    );
};
