import { auth } from '@workspace/common/server/config/firebase';

export async function revokenAndCreateCustomUserToken<TokenClaims extends object>(userId: string, claims: TokenClaims) {
    await auth().revokeRefreshTokens(userId);

    const customToken = await auth().createCustomToken(userId, claims);

    return customToken;
}
