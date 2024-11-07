import { ExternalLink, Strong, TextBlock } from '~client/ui-kit';

import { Caption } from '../Caption';
import { ProviderProfile } from '../ProviderProfile';

export interface ProviderProps {
    name: string;
    icon?: string;
}

export const Provider = ({ name, icon }: ProviderProps) => {
    return (
        <div>
            <Caption
                caption='Provider:'
                tooltip={
                    <>
                        <Strong>How to get a provider type?</Strong>
                        <TextBlock>
                            Each passkey provider (as an authenticator) is assigned a unique AAGUID by its manufacturer
                            or developer.
                        </TextBlock>
                        <TextBlock>
                            During the registration process, the authenticator includes its AAGUID in the attestation
                            object sent to the relying party.
                        </TextBlock>

                        <TextBlock>
                            Check out more on{' '}
                            <ExternalLink href='https://web.dev/articles/webauthn-aaguid'>
                                web.dev/articles/webauthn-aaguid
                            </ExternalLink>
                            .
                        </TextBlock>
                    </>
                }
            />

            <ProviderProfile name={name} icon={icon} />
        </div>
    );
};
