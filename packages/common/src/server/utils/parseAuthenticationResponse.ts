import { base64URLStringToBuffer } from '@simplewebauthn/browser';
import { decodeClientDataJSON, parseAuthenticatorData } from '@simplewebauthn/server/helpers';
import type { AuthenticationResponseJSON } from '@simplewebauthn/types';

import { logger } from '~logger';

/**
 * Just an example what you can do with the result.
 * This is not needed for the authentication process of this demo.
 */
export function parseAutheticationResponse(authenticationResponse: AuthenticationResponseJSON) {
    const clientDataJSON = decodeClientDataJSON(authenticationResponse.response.clientDataJSON);

    const authenticatorData = parseAuthenticatorData(
        new Uint8Array(base64URLStringToBuffer(authenticationResponse.response.authenticatorData)),
    );

    logger.debug({ clientDataJSON, authenticatorData });
}
