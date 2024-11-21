import type { DecodedIdToken } from 'firebase-admin/auth';

import { auth } from '~server/config/firebase';

export async function parseAndVerifyIdToken<CustomClaims>(
    authorizationHeader: string | undefined,
): Promise<(DecodedIdToken & CustomClaims) | null> {
    const idToken = authorizationHeader?.split('Bearer ')[1];

    if (!idToken) {
        return null;
    }

    return (await auth().verifyIdToken(idToken, true)) as DecodedIdToken & CustomClaims;
}
