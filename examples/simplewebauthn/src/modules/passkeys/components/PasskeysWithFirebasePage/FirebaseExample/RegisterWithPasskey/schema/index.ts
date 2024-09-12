import { z } from 'zod';

import { email } from '~modules/form/validators';

export const registerFormSchema = z.object({
    email,
});

export type RegisterFormSchema = typeof registerFormSchema;

export type RegisterFormValues = z.infer<RegisterFormSchema>;
