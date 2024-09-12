import type { NextApiRequest, NextApiResponse } from 'next';
import { parse, serialize, type CookieSerializeOptions } from 'cookie';

export interface SetCookieProps extends CookieSerializeOptions {
    name: string;
    value: string;
}

export function setCookie(res: NextApiResponse, { name, value, ...options }: SetCookieProps) {
    res.setHeader('Set-Cookie', serialize(name, value, options));
}

export function getCookie(req: NextApiRequest, name: string): string | null {
    const cookies = parse(req.headers.cookie || '', {});

    return cookies[name] ?? null;
}

export type DeleteCookieProps = Omit<SetCookieProps, 'value' | 'expires'>;

export function deleteCookie(res: NextApiResponse, { name, ...options }: DeleteCookieProps) {
    res.setHeader('Set-Cookie', serialize(name, '', { expires: new Date(), ...options }));
}
