import { db } from '~server/config/firebase';
import { collections } from '~server/constants/collections';
import type { ChallengeSession } from '~types';

export async function setChallengeSession(data: ChallengeSession) {
    await db().collection(collections.ChallengeSessions).doc(data.id).set(data);
}

export async function getChallengeSession(sessionId: string) {
    const doc = await db().collection(collections.ChallengeSessions).doc(sessionId).get();

    return doc.exists ? (doc.data() as ChallengeSession) : null;
}

export async function deleteChallengeSession(sessionId: string) {
    await db().collection(collections.ChallengeSessions).doc(sessionId).delete();

    // NOTE: This would be a much better run in a cron job or a scheduled task, so we don't block the request but for the demo purpose, it's good enough.
    await deleteExpiredChallengeSessions();
}

export async function deleteExpiredChallengeSessions() {
    const querySnapshot = await db()
        .collection(collections.ChallengeSessions)
        .where(
            'expiresAt' satisfies keyof ChallengeSession,
            '<=',
            new Date().toISOString() satisfies ChallengeSession['expiresAt'],
        )
        .get();

    const batch = db().batch();

    // NOTE: this might be ok for small collections, but for larger collections, consider deleting it in smaller batch size.
    querySnapshot.docs.forEach(doc => batch.delete(doc.ref));

    await batch.commit();
}
