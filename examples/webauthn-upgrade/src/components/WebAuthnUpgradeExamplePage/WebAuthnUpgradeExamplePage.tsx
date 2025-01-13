import Link from 'next/link';

import { BlogPostCallout } from '@workspace/common/client/blog-post/components';
import { ExampleDescription, ExampleHeader, ExampleWrapper } from '@workspace/common/client/example/components';
import { PageHeader } from '@workspace/common/client/layout/components';
import { Container } from '@workspace/common/client/ui-kit';

import { UpgradeExample } from './UpgradeExample';

export const WebAuthnUpgradeExamplePage = () => {
    return (
        <>
            <PageHeader pageTitle='Passkeys authentication' />

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
                        githubUrl='https://github.com/cermakjiri/with-webauthn/tree/dev/examples/webauthn-upgrade'
                    />
                    <UpgradeExample />
                </Container>
            </ExampleWrapper>
            <BlogPostCallout />
        </>
    );
};
