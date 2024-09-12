import { ExternalLink } from '@workspace/ui';

import { Caption } from '../Caption';
import { CopyToClipboardInput } from './CopyToClipboardInput';

export interface PublicKeyProps {
    value: string;
}

export const PublicKey = ({ value }: PublicKeyProps) => {
    return (
        <>
            <Caption
                caption='Public key:'
                tooltip={
                    <ExternalLink href='https://developer.mozilla.org/en-US/docs/Web/API/AuthenticatorAttestationResponse/getPublicKey'>
                        MDN
                    </ExternalLink>
                }
            />
            <CopyToClipboardInput value={value} />
        </>
    );
};
