<div style="text-align:center">

# With WebAuthn

A repository with full stack WebAuthn API examples.

<div style="text-align:left">

## Examples

1. **[Passkeys with SimpleWebAuthn & Firebase](examples/simplewebauthn)**
    - Creating (user registration), retrieving (user login), linking, removing of passkeys.
    - Issuing a JWT token via Firebase Auth once user is authenticated.
    - Passkes are stored in Firebase Firestore.
    - Formatting and parsing of WebAuthn API request / responses done via SimpleWebAuthn library.
    - 👉 [**Check out the demo**](https://with-webauthn.dev)

---

## Development

### Common Stack notes:

-   The whole project is managed using tuborepo and yarn workspaces.
-   All examples are in NextJS (React) framework.
-   API calls are handled with React Tanstack query on client.
-   API endpoints are build via NextJS API routes.
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

3. Then continue with final steps for specific example:
    - [Passkeys with SimpleWebAuthn & Firebase](examples/simplewebauthn/README.md)

## Have you a found a bug?

Please, open a [Github issue](https://github.com/cermakjiri/with-webauthn/issues/new/choose). Thank you. ❤️
