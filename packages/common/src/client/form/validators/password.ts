import { z } from 'zod';

import { formError } from '../errors';
import { required } from './general';

const includesOneDigits = /(?:\D*\d){1}/;
const includesOneUpperCase = /(?=.*[A-Z])/;
const includesOneSpecialChar = /[A-Za-z0-9 ]*[^A-Za-z0-9 ][A-Za-z0-9 ]*/;

export const newPassword = required.pipe(
    z
        .string()
        .min(10, formError.password.length)
        .refine(value => includesOneDigits.test(value), {
            message: formError.password.numerical,
        })
        .refine(value => includesOneUpperCase.test(value), {
            message: formError.password.casing,
        })
        .refine(value => includesOneSpecialChar.test(value), {
            message: formError.password.special,
        }),
);

export const password = required;
