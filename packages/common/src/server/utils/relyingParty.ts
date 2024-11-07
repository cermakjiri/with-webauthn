/**
 * - The Relying Party ID can be the root domain (e.g. example.com) or a subdomain (auth.example.com)
 * - Changing the Relying Party ID for an online service will break existing passkeys (the only exception: the new Relying Party ID is a subdomain of the old Relying Party ID)
 */
export const getRpId = (clientOrigin: string) => {
    const url = new URL(clientOrigin);

    return url.hostname;
};
