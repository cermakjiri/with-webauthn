import type { DecodedIdToken } from 'firebase-admin/auth';

import { getPasskeys } from '@workspace/common/server/services/passkeys';
import { parseAndVerifyIdToken } from '@workspace/common/server/utils';

import { tokenClaims } from '~server/constans/tokenClaims';

export type DecodedIdTokenForMFA = DecodedIdToken & {
    mfa_enabled: boolean;
};

export async function parseAndVerifyIdTokenForMFA(authorizationHeader: string | undefined) {
    const decodedIdToken = await parseAndVerifyIdToken(authorizationHeader);

    if (!decodedIdToken || !decodedIdToken.email_verified) {
        return null;
    }

    const userPasskeys = await getPasskeys(decodedIdToken.uid);

    const mfaEnabled = decodedIdToken[tokenClaims.MFA_ENABLED];

    if ((mfaEnabled && userPasskeys.length > 0) || (!mfaEnabled && userPasskeys.length === 0)) {
        return decodedIdToken as DecodedIdTokenForMFA;
    }

    return null;
}
