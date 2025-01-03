import { isAntonioError } from '@ackee/antonio-core';
import { WebAuthnError } from '@simplewebauthn/browser';

import { parseCustomFirebaseErrorMessage } from '~client/firebase/errors';

function isAbortError(error: unknown): error is {
    name: 'AbortError';
    message: string;
    stack: string;
} {
    return error instanceof Error && error.name === 'AbortError' && 'message' in error && 'stack' in error;
}

export async function parseUnknownError(error: unknown) {
    const firebaseError = parseCustomFirebaseErrorMessage(error);

    if (firebaseError) {
        return {
            type: 'FIREBASE',
            message: firebaseError,
        } as const;
    }

    if (isAntonioError(error)) {
        const errroData = error.response.bodyUsed ? error.data : await error.response.text();

        return {
            type: 'API_ERROR',
            message: typeof errroData === 'string' ? errroData : JSON.stringify(errroData, null, 2),
        } as const;
    }

    if (error instanceof WebAuthnError && isAbortError(error.cause)) {
        return {
            type: 'ABORT_ERROR',
            message: error.cause.message,
        } as const;
    }

    if (error instanceof Error) {
        return {
            type: 'GENERAL',
            message: error.message,
        } as const;
    }

    return {
        type: 'UNKNOWN',
        message: 'An unknown error occurred. Please try it again later.',
    } as const;
}
