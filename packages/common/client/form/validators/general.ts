import { z } from 'zod';

import { formError } from '../errors';

export const required = z
    .string({
        required_error: formError.required,
        invalid_type_error: formError.required,
    })
    .trim();

export const requiredNonEmpty = required.pipe(z.string().min(1, { message: formError.required }));

export const email = required.pipe(z.string().email({ message: formError.email }));

export const number = z.coerce.number({
    invalid_type_error: formError.required,
    required_error: formError.required,
});
