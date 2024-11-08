import { logger } from '~logger';
import { auth } from '~server/config/firebase';

export async function parseAndVerifyIdToken(authorizationHeader: string | undefined) {
    try {
        const idToken = authorizationHeader?.split('Bearer ')[1];

        if (!idToken) {
            return null;
        }

        return await auth().verifyIdToken(idToken, true);
    } catch (error) {
        logger.error(error);

        return null;
    }
}
