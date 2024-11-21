import { z } from 'zod';

import { email, password } from '@workspace/common/client/form/validators';

export const loginFormSchema = z.object({
    email,
    password,
});

export type LoginFormSchema = typeof loginFormSchema;

export type LoginFormValues = z.infer<LoginFormSchema>;
