import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';

import { collections } from '~server/constants/collections';
import type { Passkey } from '~server/types';

import { db } from '../config';

export const getPasskeys = async (userId: Passkey['userId']) => {
    const passkeysCollection = collection(db(), collections.Passkeys);

    const withUserId = where('userId' satisfies keyof Passkey, '==', userId satisfies Passkey['userId']);
    const fromNewest = orderBy('createdAt' satisfies keyof Passkey, 'desc');

    const querySnapshot = await getDocs(query(passkeysCollection, withUserId, fromNewest, limit(100)));

    return querySnapshot.docs.map(
        doc =>
            ({
                ...doc.data(),
                id: doc.id,
            }) as Passkey & { id: string },
    );
};
