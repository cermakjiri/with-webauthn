import Link from 'next/link';

import { ExampleDescription, ExampleHeader, ExampleWrapper } from '@workspace/common/client/example/components';
import { MainHeader } from '@workspace/common/client/layout/components';
import { Container } from '@workspace/common/client/ui-kit';

import { UpgradeExample } from './UpgradeExample';

export const WebAuthnUpgradeExamplePage = () => {
    return (
        <>
            <MainHeader pageTitle='Passkeys authentication' />

            <ExampleWrapper>
                <Container maxWidth='lg'>
                    <ExampleHeader
                        title='Upgrade to passkeys'
                        description={
                            <ExampleDescription
                                description='This demo illustrates user transition flow from traditional email/password authentication to passkeys:'
                                features={[
                                    'A user registers with traditional email/password and verifies their email afterwards.',
                                    'Then the user can link passkey/s and therefore upgrades to MFA.',
                                    'The user can downgrade to single-factor authentication by removing all their passkeys.',
                                    <>
                                        Built with{' '}
                                        <Link href='https://simplewebauthn.dev' target='_blank'>
                                            SimpleWebAuthn
                                        </Link>{' '}
                                        , Firebase Auth and Firestore SDKs.
                                    </>,
                                ]}
                            />
                        }
                    />
                    <UpgradeExample />
                </Container>
            </ExampleWrapper>
        </>
    );
};
