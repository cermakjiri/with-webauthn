import Link from 'next/link';

import { ExampleDescription, ExampleHeader, ExampleWrapper } from '@workspace/common/client/example/components';
import { MainHeader } from '@workspace/common/client/layout/components';
import { Container } from '@workspace/common/client/ui-kit';

import { DefaultExample } from './DefaultExample';

export const WebAuthnDefaultExamplePage = () => {
    return (
        <>
            <MainHeader pageTitle='Passkeys authentication' />

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
                                    'Passkes are stored in Firebase Firestore.',
                                ]}
                            />
                        }
                    />
                    <DefaultExample />
                </Container>
            </ExampleWrapper>
        </>
    );
};