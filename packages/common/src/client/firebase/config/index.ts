import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { env } from '~client/env';

let app: ReturnType<typeof initializeApp>;

export const getFirebaseApp = () => {
    // @ts-ignore
    if (app) {
        return app;
    }

    const appName = 'with-webauthn-firebase-example';

    return initializeApp(
        {
            apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
            measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        },
        appName,
    );
};

export const auth = () => {
    const auth = getAuth(getFirebaseApp());

    auth.useDeviceLanguage();

    return auth;
};
export const analytics = () => getAnalytics(getFirebaseApp());
export const db = () => {
    const app = getFirebaseApp();
    const databaseId = env.NEXT_PUBLIC_FIREBASE_DB_ID;

    return databaseId ? getFirestore(app, databaseId) : getFirestore(app);
};
