import { credential } from 'firebase-admin';
import { getApp, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

import { env } from '~server/env';

/**
 * Firebase Admin TEST app for passkeys
 */
let adminApp: ReturnType<typeof initializeApp>;

export const getAdminApp = () => {
    if (!adminApp) {
        const appName = 'with-webauthn-firebase-example';

        try {
            adminApp = getApp(appName);
        } catch (e) {
            adminApp = initializeApp(
                {
                    credential: credential.cert({
                        projectId: env.FIREBASE_PROJECT_ID,
                        privateKey: env.FIREBASE_PRIVATE_KEY,
                        clientEmail: env.FIREBASE_CLIENT_EMAIL,
                    }),
                },
                appName,
            );

            const firestore = getFirestore(adminApp);

            firestore.settings({
                ignoreUndefinedProperties: true,
            });
        }
    }

    return adminApp;
};

export const db = () => {
    const app = getAdminApp();

    return env.FIREBASE_DB_ID ? getFirestore(app, env.FIREBASE_DB_ID) : getFirestore(app);
};

export const auth = () => getAuth(getAdminApp());
