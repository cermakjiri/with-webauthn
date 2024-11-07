import { useController, useFormContext, type Path } from 'react-hook-form';

import type { UnknownFormValues } from '~client/form/types';

import { TextInput, type TextInputProps } from '../../inputs';
import { InputContainer, StyledContainer } from './TextField.styles';

export interface TextFieldProps<TFormValues extends UnknownFormValues> extends TextInputProps {
    name: Path<TFormValues>;
    endAdornment?: React.ReactNode;
    trim?: boolean;
}

export const TextField = <TFormValues extends UnknownFormValues>({
    name,
    fullWidth = true,
    endAdornment,
    trim = true,
    helperText,
    ...props
}: TextFieldProps<TFormValues>) => {
    const {
        control,
        formState: { isSubmitting },
    } = useFormContext<TFormValues>();

    const {
        field,
        fieldState: { error },
    } = useController<TFormValues>({ control, name });

    return (
        <StyledContainer fullWidth={fullWidth}>
            <InputContainer fullWidth={fullWidth}>
                <TextInput
                    autoComplete='off'
                    {...props}
                    ref={field.ref}
                    value={field.value ?? ''}
                    name={field.name}
                    onChange={event => {
                        const value = event.target.value;

                        field.onChange(typeof value === 'string' && trim ? value.trim() : value);
                    }}
                    onBlur={field.onBlur}
                    disabled={Boolean(field.disabled || isSubmitting)}
                    error={!!error}
                    fullWidth={fullWidth}
                    helperText={error ? error.message : helperText}
                />
                {endAdornment}
            </InputContainer>
        </StyledContainer>
    );
};
