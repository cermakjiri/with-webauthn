<div style="text-align:center">

# With WebAuthn

A repository with full stack **WebAuthn API** examples.

<div style="text-align:left">

## Examples

1. **[Authenticate with passkeys - Passkeys with SimpleWebAuthn & Firebase](examples/webauthn-default/README.md)**

    - Creating (user registration), retrieving (user login), linking multiple, and removing passkeys.
    - Passkeys autofill.
    - Formatting and parsing of WebAuthn API request / responses done via [SimpleWebAuthn](https://simplewebauthn.dev) library.
    - Built with [Firebase Auth](https://firebase.google.com/docs/auth/admin/create-custom-tokens) and Firestore SDKs.
    - 👉 [**Check out the demo**](https://with-webauthn.dev)

2. **[Upgrade to passkeys – From email/password to passkeys with SimpleWebAuthn & Firebase](examples/webauthn-upgrade/README.md)**
    - A user registers with traditional email/password and verifies their email afterwards.
    - Then the user can link passkey/s and therefore upgrades to MFA.
    - The user can downgrade to single-factor authentication by removing all their passkeys.
    - Built with [SimpleWebAuthn](https://simplewebauthn.dev), [Firebase Auth](https://firebase.google.com/docs/auth/admin/create-custom-tokens) and Firestore SDKs.
    - 👉 [**Check out the demo**](https://upgrade.with-webauthn.dev)

---

## Development

### Common Stack notes:

-   The whole project is managed using tuborepo.
-   All examples are in NextJS (React) framework.
-   API calls are handled with React Tanstack query on client.
-   API endpoints are built via NextJS API routes.
-   Forms are built with react-hook-form and validated with zod schemas.
-   Material UI with styled components as UI SDK.

### How to start the project locally?

1. Initialize package manager:
   Make sure you're running Node v20. Then initialize a package manager:

    ```sh
    corepack enable
    corepack install
    ```

    It finds `packageManager` field and installs Yarn 4.

2. Install dependencies:

    ```sh
    yarn install --immutable
    ```

3. Note that common code of each example is placed in `packages/common` (for client and server).

4. Then continue with final steps for specific example:
    - [Authenticate with passkeys](examples/webauthn-default/README.md)
    - [Upgrade to passkeys](examples/webauthn-upgrade/README.md)

## Have you a found a bug?

Please, open a [Github issue](https://github.com/cermakjiri/with-webauthn/issues/new/choose). Thank you. ❤️
