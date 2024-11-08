import { useState } from 'react';
import { InputAdornment } from '@mui/material';
import type { Path } from 'react-hook-form';

import type { UnknownFormValues } from '~client/form/types';

import { TextField, type TextFieldProps } from '../fields/TextField';
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
