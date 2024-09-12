import { bufferToBase64URLString } from '@simplewebauthn/browser';
import type { VerifiedRegistrationResponse } from '@simplewebauthn/server';
import type { RegistrationResponseJSON } from '@simplewebauthn/types';

import { db } from '~server/config/firebase';
import { collections } from '~server/constants/collections';
import type { Passkey, User } from '~server/types';

import { getPasskeyProvider } from '../aaguid';
import { createAuthUser } from '../auth';
import { addPasskey, getPasskeys, removePasskey, type AddPasskeyProps } from '../passkeys';

export async function findUserByUsername(username: User['username']) {
    const query = await db()
        .collection(collections.Users)
        .where('username' satisfies keyof User, '==', username satisfies User['username'])
        .offset(0)
        .limit(1)
        .get();

    return query.empty ? null : (query.docs[0].data() as User);
}

export function getNewUserDoc() {
    return db().collection(collections.Users).doc();
}

export async function addUser(
    newUserDoc: ReturnType<typeof getNewUserDoc>,
    { username, passkeyIds }: Omit<User, 'id'>,
) {
    const id = newUserDoc.id;
    const user = {
        id,
        passkeyIds,
        username,
    } satisfies User;

    await newUserDoc.set(user);

    return user;
}

export async function updateUser(userId: string, data: Partial<User>) {
    await db().collection(collections.Users).doc(userId).update(data);
}

export async function getUser(userId: User['id']) {
    const doc = await db().collection(collections.Users).doc(userId).get();

    if (!doc.exists) {
        return null;
    }

    return doc.data() as User;
}

interface CreateUserPasskeyProps {
    webAuthnUserId: string;
    registrationResponse: RegistrationResponseJSON;
    verifiedRegistrationInfo: VerifiedRegistrationResponse['registrationInfo'];
}

function mapPropsToPasskey(
    userId: string,
    { verifiedRegistrationInfo, registrationResponse, webAuthnUserId }: CreateUserPasskeyProps,
) {
    const { credentialID, credentialPublicKey, counter, credentialBackedUp, credentialDeviceType, aaguid, rpID } =
        verifiedRegistrationInfo!;

    return {
        credentialId: credentialID,
        credentialBackedUp,
        credentialPublicKey: bufferToBase64URLString(credentialPublicKey),
        credentialDeviceType,
        credentialCounter: counter,
        userId,
        webAuthnUserId,
        transports: registrationResponse.response.transports ?? [],
        rpId: rpID!,
        provider: getPasskeyProvider(aaguid),
    } satisfies AddPasskeyProps;
}

export async function createUserPasskey(username: string, createUserPaskeyProps: CreateUserPasskeyProps) {
    // Get empty document from user collection
    const newUserDoc = getNewUserDoc();
    const userId = newUserDoc.id;

    // Adds passkey to Firestore 'passkeys' collection
    const passkey = await addPasskey(mapPropsToPasskey(userId, createUserPaskeyProps));

    await addUser(newUserDoc, {
        username,
        passkeyIds: [passkey.id],
    });

    // Creates a new user in Firebase Authentication.
    await createAuthUser({
        uid: userId,
        email: username,
    });

    return userId;
}

export async function addUserPasskey(userId: User['id'], createUserPaskeyProps: CreateUserPasskeyProps) {
    const user = await getUser(userId);

    if (!user) {
        throw new Error('User not found');
    }

    const passkey = await addPasskey(mapPropsToPasskey(userId, createUserPaskeyProps));

    await updateUser(userId, {
        passkeyIds: [passkey.id, ...user.passkeyIds],
    });
}

export async function removeUserPasskey(userId: User['id'], passkeyId: Passkey['id']) {
    const userDoc = db().collection(collections.Users).doc(userId);
    const user = (await userDoc.get()).data() as User;

    const passkeyIds = user.passkeyIds.filter(id => id !== passkeyId);

    await userDoc.update({
        passkeyIds,
    });

    await removePasskey(passkeyId);
}

export async function getUserPasskeys(username?: User['username']) {
    const existingUser = username ? await findUserByUsername(username) : null;
    const passkeys = existingUser ? await getPasskeys(existingUser.id) : [];

    return passkeys;
}
