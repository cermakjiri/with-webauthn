import { FirebaseError } from 'firebase/app';
import { AuthErrorCodes } from 'firebase/auth';

import { customFirebaseErrors, type CustomFirebaseErrors } from '../constants';

const isFirebaseError = (error: unknown): error is FirebaseError => error instanceof FirebaseError;

export type FirebaseAuthErrorCodes = typeof AuthErrorCodes;

export type FirebaseAuthErrorCodeKey = FirebaseAuthErrorCodes[keyof FirebaseAuthErrorCodes];

const errorCodes = new Set(Object.keys(AuthErrorCodes)) as Set<FirebaseAuthErrorCodeKey>;

/**
 * @url https://firebase.google.com/docs/reference/js/v8/firebase.auth.Error
 */
export const isFirebaseErrorWithCodes = <const Codes extends (keyof FirebaseAuthErrorCodes)[]>(
    error: unknown,
    codes: Codes,
): error is FirebaseError & { code: FirebaseAuthErrorCodes[(typeof codes)[number]] } => {
    return (
        isFirebaseError(error) &&
        codes.every(code => errorCodes.has(code)) &&
        Object.values(AuthErrorCodes).includes(error.code)
    );
};

export const parseCustomFirebaseErrorMessage = (error: unknown) => {
    const codes = Object.keys(customFirebaseErrors) as (keyof CustomFirebaseErrors)[];

    if (isFirebaseError(error) && codes.includes(error.code)) {
        const code = error.code as keyof CustomFirebaseErrors;

        return customFirebaseErrors[code];
    }

    return null;
};
