import { signInWithCustomToken, signOut } from '@firebase/auth';

import { auth } from '@workspace/common/client/firebase/config';

export async function reauthenticate(customToken: string) {
    await signOut(auth());
    await signInWithCustomToken(auth(), customToken);
}
