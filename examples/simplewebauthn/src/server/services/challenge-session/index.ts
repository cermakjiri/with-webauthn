import type { NextApiRequest, NextApiResponse } from 'next';
import { bufferToBase64URLString } from '@simplewebauthn/browser';

import { env } from '~env';
import type { ChallengeSession } from '~server/types';
import { getRpId } from '~server/utils/relyingParty';

import { deleteSessionIdCookie, getSessionIdCookie, setSessionIdCookie } from './cookies';
import { deleteChallengeSession, getChallengeSession, setChallengeSession } from './db';

export type InitializeChallengeSessionProps = {
    timeout: number;
    challenge: ArrayBuffer;
} & (
    | {
          type: 'attestation';
          username: string;
      }
    | {
          type: 'assertion';
      }
);

/**
 * - Generate a random session ID and set it as a serve-side cookie.
 * - Save the challenge session to the database.
 * - The session ID will be used to during the verification process to retrieve expected challenge and other data.
 */
export async function initializeChallengeSession(
    res: NextApiResponse,
    { timeout, challenge, ...restProps }: InitializeChallengeSessionProps,
) {
    const sessionId = crypto.randomUUID();
    // Use the timeout from the public key options
    const expiresAt = new Date(Date.now() + timeout!);

    setSessionIdCookie(res, { sessionId, expiresAt });

    await setChallengeSession({
        ...restProps,
        id: sessionId,
        challenge: bufferToBase64URLString(challenge),
        expiresAt: expiresAt.toISOString(),
        origin: env.NEXT_PUBLIC_CLIENT_ORIGIN,
        rpId: getRpId(env.NEXT_PUBLIC_CLIENT_ORIGIN),
    });
}

/**
 * - Retrieve the challenge session data (`ChallengeSession`) by the session ID.
 * - Delete the session ID cookie.
 * - Delete the challenge session from the database.
 * - If the challenge session is found and it's of the correct type, and not expired, return it.
 * - Otherwise, return null.
 */
export async function retrieveAndInvalidateChallengeSession(
    req: NextApiRequest,
    res: NextApiResponse,
    type: ChallengeSession['type'],
) {
    const sessionId = getSessionIdCookie(req);
    const challengeSession = sessionId ? await getChallengeSession(sessionId) : null;

    deleteSessionIdCookie(res);

    if (challengeSession) {
        await deleteChallengeSession(challengeSession.id);
    }

    if (!challengeSession || challengeSession.type !== type || new Date(challengeSession.expiresAt) < new Date()) {
        return null;
    }

    return challengeSession;
}
