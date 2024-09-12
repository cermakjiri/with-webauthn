import { useState } from 'react';
import { InputAdornment } from '@mui/material';
import type { Path } from 'react-hook-form';

import { TextField, type TextFieldProps, type UnknownFormValues } from '@workspace/ui';

import { TogglePasswordVisibility, type PasswordType } from './TogglePasswordVisibility';

export interface PasswordFieldProps<FormValues extends UnknownFormValues> extends TextFieldProps<FormValues> {
    name: Path<FormValues>;
}

export const PasswordField = <FormValues extends UnknownFormValues>({
    name,
    ...rest
}: PasswordFieldProps<FormValues>) => {
    const [type, setType] = useState<PasswordType>('password');

    return (
        <TextField<FormValues>
            label='Password'
            autoCorrect='false'
            autoCapitalize='false'
            {...rest}
            type={type}
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <TogglePasswordVisibility type={type} onToggle={setType} />
                    </InputAdornment>
                ),
            }}
            name={name}
        />
    );
};
