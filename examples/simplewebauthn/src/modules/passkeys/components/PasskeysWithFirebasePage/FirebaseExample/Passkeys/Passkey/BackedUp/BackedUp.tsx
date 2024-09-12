import { Code, Icon, Strong, TextBlock } from '@workspace/ui';
import { Check, Clear } from '@workspace/ui/icons';

import { Caption } from '../Caption';

export interface BackedUpProps {
    value: boolean;
}

export const BackedUp = ({ value }: BackedUpProps) => {
    return (
        <>
            <Caption
                caption='Backed up:'
                tooltip={
                    <>
                        <Strong>What is backup state (BS)?</Strong>
                        <TextBlock>
                            A boolean value available in both flows: passkey creation (attestation ceremony) and passkey
                            authentication (assertation ceremony) as a 4th bit of the flags field in the authenticator
                            data.
                        </TextBlock>
                        <TextBlock>
                            It is <Code>true</Code> if the created passkey is actually set to be synchronized.
                        </TextBlock>
                    </>
                }
            />
            <Icon icon={value ? Check : Clear} />
        </>
    );
};
