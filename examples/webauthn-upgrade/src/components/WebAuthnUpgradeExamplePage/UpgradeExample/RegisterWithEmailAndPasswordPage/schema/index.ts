import { z } from 'zod';

import { email, newPassword } from '@workspace/common/client/form/validators';

export const registerFormSchema = z.object({
    email,
    password: newPassword,
});

export type RegisterFormSchema = typeof registerFormSchema;

export type RegisterFormValues = z.infer<RegisterFormSchema>;
