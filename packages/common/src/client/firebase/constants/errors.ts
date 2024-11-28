import type { FirebaseAuthErrorCodeKey } from '../errors';

export const customFirebaseErrors = {
    'auth/email-already-in-use': 'The email address is already in use by another account.',
    'auth/app-deleted': 'The user corresponding to the provided email has been deleted.',
    'auth/user-disabled': 'The user corresponding to the provided email has been disabled.',
} as const satisfies Partial<Record<FirebaseAuthErrorCodeKey, string>>;

export type CustomFirebaseErrors = typeof customFirebaseErrors;
