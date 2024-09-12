import { useFormContext } from 'react-hook-form';

import { Button, type ButtonProps } from '@workspace/ui';

export interface SubmitButtonProps extends Omit<ButtonProps, 'variant' | 'size'> {
    children?: React.ReactNode;
}

export const SubmitButton = ({ children, ...rest }: SubmitButtonProps) => {
    const {
        formState: { isSubmitting },
    } = useFormContext();

    return (
        <Button fullWidth {...rest} type='submit' loading={isSubmitting}>
            {children}
        </Button>
    );
};
