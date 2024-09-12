import { useMemo } from 'react';
import { FormProvider, useForm, type UseFormProps, type UseFormReturn } from 'react-hook-form';

import type { UnknownFormValues } from '@workspace/ui';

import { useLocalizedResolver, type UnkownFormSchema } from '~modules/form/hooks';

export interface FormProps<FormSchema extends UnkownFormSchema, FormValues extends UnknownFormValues> {
    schema: FormSchema;
    children: React.ReactNode;
    onSubmit: (values: FormValues, form: UseFormReturn<FormValues>) => Promise<void> | void;
    defaultValues?: UseFormProps<FormValues>['defaultValues'];
}

export const Form = <FormSchema extends UnkownFormSchema, FormValues extends UnknownFormValues>({
    schema,
    children,
    defaultValues,
    onSubmit,
}: FormProps<FormSchema, FormValues>) => {
    const resolver = useLocalizedResolver(schema);
    const form = useForm<FormValues>({
        resolver,
        defaultValues,
        mode: 'onSubmit',
    });

    const submit = useMemo(() => form.handleSubmit(values => onSubmit(values, form)), [form, onSubmit]);

    return (
        <FormProvider<FormValues> {...form}>
            <form onSubmit={submit}>{children}</form>
        </FormProvider>
    );
};
