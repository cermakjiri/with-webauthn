import { Chip, Code, ExternalLink, Icon, InfoTooltip, Space, Strong, TextBlock, Words } from '@workspace/ui';

import type { Passkey } from '~server/types';

import { Caption } from '../Caption';
import { transportIconsMap, transportTypes, type TransportType } from './constants';
import { ChipInner, Row } from './Transports.styles';

export interface TransportsProps {
    transports: Passkey['transports'];
}

export const Transports = ({ transports }: TransportsProps) => {
    return (
        <div>
            <Caption
                caption='Transport methods:'
                tooltip={
                    <>
                        <Strong>What is it?</Strong>

                        <TextBlock>The ways of communication between your device and the authenticator.</TextBlock>

                        <TextBlock>
                            Once a passkey is created via <Code>navigator.credentials.create(...)</Code>, the result
                            provides a method for accessing available communication types. Check out more on{' '}
                            <ExternalLink href='https://developer.mozilla.org/en-US/docs/Web/API/AuthenticatorAttestationResponse/getTransports'>
                                MDN
                            </ExternalLink>
                            .
                        </TextBlock>

                        <Space />

                        <Strong>What is it for & where to get it?</Strong>
                        <TextBlock>
                            When user signs-in with a passkey, you can enhance the UX by providing hint to user agent
                            about preferred transport methods, so it can display the most suitable UI.
                            <br />
                            For example, when user creates a passkey with Touch ID (internal transport type), you do not
                            want user agent to display UI for USB transport type.
                        </TextBlock>

                        <Space />

                        <Strong>Where to pass it?</Strong>
                        <TextBlock>
                            During assertion ceremony (<Code>navigator.credentials.get(...)</Code>), you can define list
                            of <Code>allowCredentials</Code> with previously created passkeys and their transport
                            methods. The array tells the browser which credentials the server would like the user to
                            authenticate with.
                            <br />
                            Checkout more about <Code>allowCredentials</Code> on{' '}
                            <ExternalLink href='https://w3c.github.io/webauthn/#dom-publickeycredentialrequestoptions-allowcredentials'>
                                w3c.github.io/webauthn
                            </ExternalLink>
                            .
                        </TextBlock>
                    </>
                }
            />
            <Row>
                {transports
                    .filter(transport => transportTypes.has(transport))
                    .map(transport => {
                        const { icon, name, description } = transportIconsMap[transport as TransportType];

                        return (
                            <InfoTooltip key={name} title={description}>
                                <Chip
                                    label={
                                        <ChipInner>
                                            <Icon icon={icon} />
                                            <Words variant='caption'>{name}</Words>
                                        </ChipInner>
                                    }
                                />
                            </InfoTooltip>
                        );
                    })}
            </Row>
        </div>
    );
};
