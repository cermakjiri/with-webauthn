import Link from 'next/link';

import { Container, ExampleDescription, ExampleHeader } from '@workspace/ui';

import { MainHeader } from '~modules/layout/components';

import { FirebaseExample } from './FirebaseExample';
import { ExampleWrapper } from './PasskeysWithFirebasePage.styles';

export const PasskeysWithFirebasePage = () => {
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
                    <FirebaseExample />
                </Container>
            </ExampleWrapper>
        </>
    );
};
