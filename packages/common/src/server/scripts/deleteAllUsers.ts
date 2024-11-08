import { auth } from '~server/config/firebase';

/**
 * Helper function to delete all users from Firebase Auth (for development purposes).
 */
export async function deleteAllUsers() {
    const { users } = await auth().listUsers(1000);

    await Promise.allSettled(users.map(user => auth().deleteUser(user.uid)));
}
