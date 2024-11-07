import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFormContext, type Path } from 'react-hook-form';

import type { UnknownFormValues } from '~client/form/types';

import { TextField, type TextFieldProps } from '../fields';

export interface EmailFieldProps<FormValues extends UnknownFormValues> extends TextFieldProps<FormValues> {
    name: Path<FormValues>;
}

export const EmailField = <FormValues extends UnknownFormValues>({ name, ...rest }: EmailFieldProps<FormValues>) => {
    const email = useSearchParams().get('email') ?? null;
    const { setValue } = useFormContext();

    useEffect(() => {
        if (email) {
            // @ts-expect-error
            setValue(name, email);
        }
    }, [email, name, setValue]);

    return (
        <TextField<FormValues>
            label='Email'
            autoComplete='email'
            autoCorrect='false'
            autoCapitalize='false'
            {...rest}
            name={name}
            size='small'
            type='email'
            inputMode='email'
        />
    );
};
