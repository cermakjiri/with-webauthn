import type { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { applyActionCode } from 'firebase/auth';
import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs';

import { QueryLoader } from '@workspace/common/client/api/components';
import { env } from '@workspace/common/client/env';
import { auth } from '@workspace/common/client/firebase/config';

import { useExampleRouter } from '../DefaultExampleRouter';

export interface EmailVerificationCodeProps {
    children: ReactNode;
}

export function EmailVerificationCode({ children }: EmailVerificationCodeProps) {
    const [params] = useQueryStates({
        apiKey: parseAsString,
        mode: parseAsStringLiteral(['verifyEmail'] as const),
        oobCode: parseAsString,
        continueUrl: parseAsString,
    });

    const { push } = useRouter();
    const { redirect } = useExampleRouter();

    const result = useQuery({
        queryKey: ['emailVerification', params],
        queryFn: async () => {
            const { mode, oobCode, continueUrl, apiKey } = params;

            if (mode !== 'verifyEmail' || !oobCode || apiKey !== env.NEXT_PUBLIC_FIREBASE_API_KEY || !continueUrl) {
                return null;
            }

            await applyActionCode(auth(), oobCode);
            await auth().currentUser?.reload();

            await push(continueUrl);

            redirect('/login-with-password');

            return null;
        },
    });

    return <QueryLoader result={result}>{children}</QueryLoader>;
}
