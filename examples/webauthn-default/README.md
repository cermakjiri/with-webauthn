# Default WebAuthn Example - Passkeys with SimpleWebAuthn & Firebase

-   Creating (user registration), retrieving (user login), linking multiple, and removing passkeys.
-   Issuing a JWT token via Firebase Auth once user is authenticated.
-   Passkes are stored in Firebase Firestore.
-   Formatting and parsing of WebAuthn API request / responses done via SimpleWebAuthn library.

👉 **[Check out the demo](https://with-webauthn.dev)**.

## Development

### How to start it locally?

Assuming you've already finished [those steps in the main README](../../README.md), let's proceed:

1. Setup Firebase:

    1. Create a new Firebase project

    2. Copy `.env.template.local` to `.env.local`:

        - Fill up all those `NEXT_PUBLIC_FIREBASE_` env. vars.

    3. Copy `.env.template.server` to `.env.server`:

        - Create a new private key in `Firebase > Project settings > Service accounts`.
        - Fill up all those `FIREBASE_` env. vars.

    4. Don't forget to add `localhost` as Authorized domain in Firebase:

        - Firebase > Authentication > Settings > Authorised domains.

    5. Create a Firebase firestore database

2. Run `yarn dev` and checkout `http://localhost:3000` URL.
