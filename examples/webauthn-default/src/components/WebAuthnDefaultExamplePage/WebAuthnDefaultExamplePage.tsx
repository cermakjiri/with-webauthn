import Link from 'next/link';

import { BlogPostCallout } from '@workspace/common/client/blog-post/components';
import { ExampleDescription, ExampleHeader, ExampleWrapper } from '@workspace/common/client/example/components';
import { PageHeader } from '@workspace/common/client/layout/components';
import { Container } from '@workspace/common/client/ui-kit';

import { DefaultExample } from './DefaultExample';

export const WebAuthnDefaultExamplePage = () => {
    return (
        <>
            <PageHeader pageTitle='Passkeys authentication' />

            <ExampleWrapper>
                <Container maxWidth='lg'>
                    <ExampleHeader
                        title='Authenticate with passkeys'
                        description={
                            <ExampleDescription
                                description='This demo showcases the use of WebAuthn API:'
                                features={[
                                    'Creating (user registration), retrieving (user login), linking multiple, and removing passkeys.',
                                    <>
                                        Formatting and parsing of WebAuthn API requests / responses with{' '}
                                        <Link href='https://simplewebauthn.dev' target='_blank'>
                                            SimpleWebAuthn
                                        </Link>
                                        .
                                    </>,
                                    'Issuing a JWT token via Firebase Auth once user is authenticated.',
                                    'Passkeys are stored in Firebase Firestore.',
                                ]}
                            />
                        }
                        githubUrl='https://github.com/cermakjiri/with-webauthn/tree/dev/examples/webauthn-default'
                    />
                    <DefaultExample />
                </Container>
            </ExampleWrapper>
            <BlogPostCallout />
        </>
    );
};
