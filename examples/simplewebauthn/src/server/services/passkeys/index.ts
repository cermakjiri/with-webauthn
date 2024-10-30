import { FieldValue } from 'firebase-admin/firestore';

import { db } from '~server/config/firebase';
import { collections } from '~server/constants/collections';
import type { Passkey } from '~server/types';

export type AddPasskeyProps = Omit<Passkey, 'lastUsedAt' | 'createdAt' | 'id'>;

export async function addPasskey(passkey: AddPasskeyProps) {
    const newPasskeyDoc = db().collection(collections.Passkeys).doc();

    await newPasskeyDoc.set({
        ...passkey,
        id: newPasskeyDoc.id,
        createdAt: FieldValue.serverTimestamp(),
        lastUsedAt: FieldValue.serverTimestamp(),
    });

    const createdPasskey = await newPasskeyDoc.get();

    return createdPasskey.data() as Passkey;
}

export async function getPasskeys(userId: Passkey['userId']) {
    const querySnapshot = await db()
        .collection(collections.Passkeys)
        .where('userId' satisfies keyof Passkey, '==', userId satisfies Passkey['userId'])
        .offset(0)
        .limit(100)
        .get();

    return querySnapshot.docs.map(doc => doc.data() as Passkey);
}

export async function getPasskey(id: Passkey['id']) {
    const doc = await db().collection(collections.Passkeys).doc(id).get();

    if (!doc.exists) {
        return null;
    }

    return doc.data() as Passkey;
}

export async function getPasskeyBy<PropName extends keyof Passkey>(propName: PropName, propValue: Passkey[PropName]) {
    const query = await db()
        .collection(collections.Passkeys)
        .where(propName, '==', propValue satisfies Passkey[PropName])
        .offset(0)
        .limit(1)
        .get();

    return query.empty ? null : (query.docs[0].data() as Passkey);
}

export async function updatePasskey(passkeyId: Passkey['id'], props: Partial<Omit<Passkey, 'createdAt'>>) {
    await db().collection(collections.Passkeys).doc(passkeyId).update(props);
}

export async function removePasskey(passkeyId: Passkey['id']) {
    await db().collection(collections.Passkeys).doc(passkeyId).delete();
}
