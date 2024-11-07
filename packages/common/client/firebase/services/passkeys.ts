import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';

import { db } from '@workspace/common/client/firebase/config';
import { collections } from '@workspace/common/server/constants/collections';
import type { Passkey } from '@workspace/common/types';

export const fetchUserPasskeys = async (userId: Passkey['userId']) => {
    const passkeysCollection = collection(db(), collections.Passkeys);

    const withUserId = where('userId' satisfies keyof Passkey, '==', userId satisfies Passkey['userId']);
    const fromNewest = orderBy('createdAt' satisfies keyof Passkey, 'desc');

    const querySnapshot = await getDocs(query(passkeysCollection, withUserId, fromNewest, limit(100)));

    return querySnapshot.docs.map(
        doc =>
            ({
                ...doc.data(),
                id: doc.id,
            }) as Passkey,
    );
};
