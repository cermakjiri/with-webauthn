import { Alert } from '@mui/material';
import { useFormContext } from 'react-hook-form';

export interface FormErrorProps {}

export const FormError = ({}: FormErrorProps) => {
    const {
        formState: { errors },
    } = useFormContext();

    const error = errors.root?.message;

    return error ? <Alert severity='error'>{error}</Alert> : null;
};
