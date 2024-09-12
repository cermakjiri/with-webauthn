import { z } from 'zod';

import { email } from '~modules/form/validators';

export const loginFormSchema = z.object({
    email: email.optional(),
});

export type LoginFormSchema = typeof loginFormSchema;

export type LoginFormValues = z.infer<LoginFormSchema>;
