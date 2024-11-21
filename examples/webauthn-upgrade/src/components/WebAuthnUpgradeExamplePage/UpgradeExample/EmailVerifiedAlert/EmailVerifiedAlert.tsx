import { parseAsBoolean, useQueryState } from 'nuqs';

import { Alert, Divider, Words } from '@workspace/common/client/ui-kit';

export interface EmailVerifiedAlertProps {}

export const EmailVerifiedAlert = ({}: EmailVerifiedAlertProps) => {
    const [verified, setVerified] = useQueryState('verified', parseAsBoolean);

    if (verified !== true) {
        return null;
    }

    return (
        <>
            <Alert
                severity='success'
                onClose={() => {
                    setVerified(null);
                }}
                sx={{ mb: 3 }}
            >
                <Words variant='body2'>
                    Email verified.
                    <br />
                    You can now add passkey to your account.
                </Words>
            </Alert>
            <Divider />
        </>
    );
};
