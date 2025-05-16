# Upgrade to passkeys example - From email/password to passkeys

- A user registers with traditional email/password and verifies their email afterwards.
- Then the user can link passkey/s and therefore upgrades to MFA.
- The user can downgrade to single-factor authentication by removing all their passkeys.
- Built with [SimpleWebAuthn](https://simplewebauthn.dev), [Firebase Auth](https://firebase.google.com/docs/auth/admin/create-custom-tokens) and Firestore SDKs.

A part from that, the demo includes:

- Creating (user registration), retrieving (user login), linking multiple, and removing passkeys.
- Issuing a JWT token via Firebase Auth once user is authenticated.
- Passkeys are stored in Firebase Firestore.
- Formatting and parsing of WebAuthn API request / responses done via SimpleWebAuthn library.

👉 **[Check out the demo](https://upgrade.with-webauthn.dev)**.

## Development

### How to start it locally?

Assuming you've already finished [those steps in the main README](../../README.md), let's proceed:

> Note you can use the same Firebase project for multiple examples.
> However, each example requires its own Firestore database, see details below.

1. Setup Firebase:

    1. Create a new Firebase project

    2. Initialize `Authentication`
        - Enable `Email/Password` sign-in provider.
        - Add `localhost` as Authorized domain in Firebase:
            - `Firebase > Authentication > Settings > Authorised domains.`
        - Set Email verification URL:
            1. `Firebase > Authentication > Templates > Email address verification`
            2. `Customize action URL`
            3. `http://localhost:3001`
    3. Create a Firebase firestore database

        - Initialize a new database.
        - Set security rules:

            ```
            rules_version = '2';

            service cloud.firestore {
                match /databases/{database}/documents {
                    // Deny all access by default
                    match /{document=**} {
                        allow read, write: if false;
                    }

                    // Match for users collection
                    match /users/{uid} {
                        allow read: if request.auth != null && request.auth.uid == uid && request.auth.token.email_verified == true;
                    }

                    // Match for passkeys collection
                    match /passkeys/{passkeyId} {
                        allow read: if request.auth != null && resource.data.userId == request.auth.uid && request.auth.token.email_verified == true && request.auth.token.mfa_enabled == true;
                    }
                }
            }
            ```

    4. Copy `.env.template.local` to `.env.local`:

        - Fill up all those `NEXT_PUBLIC_FIREBASE_` env. vars.
        - Don't forget to set `NEXT_PUBLIC_FIREBASE_DB_ID=firestore-db-name`.

    5. Copy `.env.template.server` to `.env.server`:

        - Create a new private key in `Firebase > Project settings > Service accounts`.
        - Fill up all those `FIREBASE_` env. vars.
        - Don't forget to set `FIREBASE_DB_ID=firestore-db-name`.

2. Run `yarn dev` in **root repository** and checkout `http://localhost:3001` URL.
3. Hey mate, welcome to the WebAuthn world. 🙌

---

> #### 💡 Are you want to learn more about WebAuthn and passkeys?
>
> Let me share with you a developer guide to passkeys in my [Welcome to the world of passkeys](https://www.ackee.agency/blog/welcome-to-the-world-of-passkeys) blog post (česky [Vítejte ve světě passkeys](https://www.ackee.cz/blog/vitejte-ve-svete-passkeys)).
