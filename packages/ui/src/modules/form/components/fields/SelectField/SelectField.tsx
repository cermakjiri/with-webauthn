import { forwardRef, type ForwardedRef } from 'react';
import { useController, useFormContext, type Path } from 'react-hook-form';

import type { UnknownFormValues } from '../../../types';
import { Select, type DefaultSelectOption, type SelectProps } from '../../inputs';

interface SelectFieldProps<TFormValues extends UnknownFormValues, SelectOption extends DefaultSelectOption>
    extends SelectProps<SelectOption> {
    name: Path<TFormValues>;
}

const SelectFieldComponent = <FormValues extends UnknownFormValues, SelectOption extends DefaultSelectOption>(
    { name, onChange, disabled, ...rest }: SelectFieldProps<FormValues, SelectOption>,
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const {
        control,
        formState: { isSubmitting, isLoading },
    } = useFormContext<FormValues>();

    const {
        field,
        fieldState: { error },
    } = useController<FormValues>({ control, name });

    const isDisabled = disabled || field.disabled || isSubmitting || isLoading;

    return (
        <div>
            {/* @ts-expect-error */}
            <Select<SelectOption>
                autoComplete='off'
                {...rest}
                {...field}
                onChange={value => {
                    const nextValue = value || null;

                    field.onChange({ target: { value: nextValue } });
                    onChange?.(nextValue);
                }}
                error={!!error}
                disabled={isDisabled}
                ref={ref}
            />
        </div>
    );
};

export const SelectField = forwardRef(SelectFieldComponent);
