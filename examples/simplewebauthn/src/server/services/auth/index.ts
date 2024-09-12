import { Auth } from 'firebase-admin/auth';

import { auth } from '~server/config/firebase';

export async function createAuthUser(props: Parameters<Auth['createUser']>[0]) {
    await auth().createUser(props);
}

/**
 * @param userId
 * @docs https://firebase.google.com/docs/auth/admin/create-custom-tokens
 */
export async function createCustomToken(userId: string) {
    return auth().createCustomToken(userId);
}
