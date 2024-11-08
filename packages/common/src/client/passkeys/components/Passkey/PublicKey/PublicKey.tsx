import { CopyToClipboardInput } from '~client/clipboard/components';
import { ExternalLink } from '~client/ui-kit';

import { Caption } from '../Caption';

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
