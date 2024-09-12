import { ExternalLink, Icon, Strong, TextBlock } from '@workspace/ui';
import { Check, Clear } from '@workspace/ui/icons';

import type { Passkey } from '~server/types';

import { Caption } from '../Caption';

export interface DeviceTypeProps {
    value: Passkey['credentialDeviceType'];
}

export const DeviceType = ({ value }: DeviceTypeProps) => {
    return (
        <>
            <Caption
                caption='Syncable:'
                tooltip={
                    <>
                        <Strong>What is a backup-eligible (BE) credential?</Strong>
                        <TextBlock>
                            A backup-eligible credential is a credential that is not bound to a single authenticator and
                            can be backed up and restored to another one. Also known as a multi-device credential.
                        </TextBlock>
                        <TextBlock>
                            For example via cloud or local network sync. Typically, the credential is stored in Apple
                            Keychain, Google Password Manager, a browser password managers or a similar service.
                        </TextBlock>

                        <Strong>How to get it?</Strong>
                        <TextBlock>
                            It is a one of flags, as part of authenticator data, returned in both flows: passkey
                            creation (attestation ceremony) and passkey authentication (assertation ceremony).{' '}
                            <ExternalLink href='https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API/Authenticator_data#accessing_authenticator_data'>
                                Check out MDN docs
                            </ExternalLink>
                            .
                        </TextBlock>
                    </>
                }
            />
            <Icon icon={value === 'multiDevice' ? Check : Clear} />
        </>
    );
};
