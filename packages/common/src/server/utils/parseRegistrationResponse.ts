import { base64URLStringToBuffer } from '@simplewebauthn/browser';
import {
    decodeAttestationObject,
    decodeClientDataJSON,
    decodeCredentialPublicKey,
    parseAuthenticatorData,
} from '@simplewebauthn/server/helpers';
import type { RegistrationResponseJSON } from '@simplewebauthn/types';

import { logger } from '~logger';

/**
 * An example of how to all data parse the registration response.
 * This is not needed for the registration process of this demo.
 */
export function parseRegistrationResponse(registrationResponse: RegistrationResponseJSON) {
    const clientDataJSON = decodeClientDataJSON(registrationResponse.response.clientDataJSON);

    const attestationObject = decodeAttestationObject(
        new Uint8Array(base64URLStringToBuffer(registrationResponse.response.attestationObject)),
    );

    const authenticatorData = parseAuthenticatorData(attestationObject.get('authData'));

    const createndtialPublicKey = decodeCredentialPublicKey(
        new Uint8Array(base64URLStringToBuffer(registrationResponse.response.publicKey!)),
    );

    logger.debug({ clientDataJSON, attestationObject, authenticatorData, createndtialPublicKey });
}
