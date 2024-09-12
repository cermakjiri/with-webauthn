import { forwardRef, type ForwardedRef } from 'react';
import type { TextFieldProps } from '@mui/material';

import { StyledTextInput } from './TextInput.styles';

export interface TextInputProps extends Omit<TextFieldProps, 'variant' | 'color'> {
    /**
     * Units of spacing as number or string.
     */
    width?: number | string;
}

export const TextInputComponent = (
    { disabled, fullWidth = true, value, ...props }: TextInputProps,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    return (
        <StyledTextInput
            {...props}
            value={value}
            fullWidth={fullWidth}
            disabled={disabled}
            ref={ref}
            InputLabelProps={{
                shrink: !value && props.placeholder ? true : undefined,
                ...props.InputLabelProps,
            }}
        />
    );
};

export const TextInput = forwardRef(TextInputComponent);
