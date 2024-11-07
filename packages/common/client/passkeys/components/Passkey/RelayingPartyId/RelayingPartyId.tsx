import { Code, ExternalLink, Strong, TextBlock, Words } from '~client/ui-kit';

import { Caption } from '../Caption';

export interface RelayingPartyIdProps {
    value: string;
}

export const RelayingPartyId = ({ value }: RelayingPartyIdProps) => {
    return (
        <div>
            <Caption
                caption='Relaying Party ID:'
                tooltip={
                    <>
                        <Strong>What is it?</Strong>
                        <TextBlock>
                            Relaying Party ID (<Code>rpId</Code>) corresponds to a domain name (
                            <Code>location.hostname</Code>) of your application that implements WebAuthn API. It defines
                            the scope of the credential.
                        </TextBlock>
                        <TextBlock>
                            For example, if your application is hosted on <Code>https://awesome.site.com</Code>, the
                            valid RP IDs are <Code>awesome.site.com</Code> or <Code>site.com</Code>.
                        </TextBlock>
                        <TextBlock>
                            If the RP ID does not meet the necessary constraints, the browser will throw a{' '}
                            <Code>SecurityError</Code>.
                        </TextBlock>

                        <ExternalLink href='https://www.w3.org/TR/webauthn-2/#relying-party-identifier'>
                            Checkout official docs
                        </ExternalLink>
                    </>
                }
            />
            <Words variant='caption'>
                <Code>{value}</Code>
            </Words>
        </div>
    );
};
