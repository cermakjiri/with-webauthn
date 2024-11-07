import type { NextApiRequest, NextApiResponse } from 'next';

import { deleteCookie, getCookie, setCookie, type DeleteCookieProps } from '~server/utils/cookies';

export interface SetSessionIdCookieProps {
    expiresAt: Date;
    sessionId: string;
}

const SESSION_ID_COOKIE_NAME = 'challenge-session';

/**
 * Configuration based on the OWASP Secure Cookie Practices.
 * https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#cookies
 */
const commonCookieOptions = {
    name: SESSION_ID_COOKIE_NAME,

    /**
     * Only send the cookie through an encrypted HTTPS (SSL/TLS) connection
     */
    secure: true,

    /**
     * Server-side cookie. Client can't access it through JavaScript thus preventing XSS attacks.
     */
    httpOnly: true,

    /**
     * Provides some protection against cross-site request forgery attacks by preventing the browser from sending the cookie along with cross-site requests.
     */
    sameSite: 'strict',

    /**
     * This cookie is only used for the authentication endpoints.
     */
    path: '/api/webauthn',

    priority: 'high',
} as const satisfies DeleteCookieProps;

export function setSessionIdCookie(res: NextApiResponse, { expiresAt, sessionId }: SetSessionIdCookieProps) {
    setCookie(res, {
        ...commonCookieOptions,
        expires: expiresAt,
        value: sessionId,
    });
}

export function getSessionIdCookie(req: NextApiRequest) {
    return getCookie(req, SESSION_ID_COOKIE_NAME);
}

export function deleteSessionIdCookie(res: NextApiResponse) {
    deleteCookie(res, commonCookieOptions);
}
