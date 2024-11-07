import { useEffect, useState, type ReactNode } from 'react';
import type { SelectProps as MUISelectProps, SelectChangeEvent } from '@mui/material';

import { FormControl, MenuItem, StyledSelect } from './Select.styles';

export interface DefaultSelectOption {
    value: string | number;
    label: string | ReactNode;
}

export interface SelectProps<SelectOption extends DefaultSelectOption>
    extends Omit<MUISelectProps<SelectOption['value']>, 'onChange'> {
    options: SelectOption[];
    onChange?: (value: SelectOption['value'] | null) => void;
    disabled?: boolean;
    label?: ReactNode;
    value?: SelectOption['value'];
}

export const Select = <SelectOption extends DefaultSelectOption>({
    options,
    onChange,
    disabled,
    label,
    error,
    fullWidth = false,
    defaultValue = '',
    value,
    className,
    ...rest
}: SelectProps<SelectOption>) => {
    const [open, setOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState<SelectOption['value']>(value ?? defaultValue);

    useEffect(() => {
        setCurrentValue(value ?? defaultValue);
    }, [defaultValue, value]);

    return (
        <FormControl disabled={disabled} fullWidth={fullWidth} className={className} focused={open}>
            <StyledSelect
                fullWidth={fullWidth}
                value={currentValue}
                onChange={(event: SelectChangeEvent<SelectOption['value']>) => {
                    const nextValue = event.target.value;

                    onChange?.(nextValue);
                    setCurrentValue(nextValue);
                }}
                disabled={disabled}
                label={label}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                error={error}
                defaultValue={defaultValue}
                {...rest}
            >
                {options.map(option => (
                    <MenuItem
                        disableRipple
                        key={option.value}
                        value={option.value}
                        selected={option.value === currentValue}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </StyledSelect>
        </FormControl>
    );
};
