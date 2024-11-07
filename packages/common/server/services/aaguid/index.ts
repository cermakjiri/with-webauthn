/**
 * @source https://github.com/passkeydeveloper/passkey-authenticator-aaguids
 */
import aagids from './combined_aaguid.json';

export type PasskeyProvider = {
    name: string;
    icon_light?: string;
    icon_dark?: string;
};

/**
 * - AAGUID should only be used to help users with passkey management.
 * - AAGUID can be modified or manipulated unless attestation is attached with a valid signature.
 * - Passkeys on Android and Apple platforms don't support attestation as of March 2024.
 */
export function getPasskeyProvider(aaguid: string) {
    // @ts-expect-error
    return Object.hasOwn(aagids, aaguid) ? (aagids[aaguid] as PasskeyProvider) : null;
}
