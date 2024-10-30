import { Container, ExampleHeader } from '@workspace/ui';

import { MainHeader } from '~modules/layout/components';

import { FirebaseExample } from './FirebaseExample';
import { ExampleWrapper } from './PasskeysWithFirebasePage.styles';

export const PasskeysWithFirebasePage = () => {
    return (
        <>
            <MainHeader pageTitle='Passkeys Authentication with Firebase' />

            <ExampleWrapper>
                <Container maxWidth='lg'>
                    <ExampleHeader
                        title='Passkeys authentication with Firebase'
                        description={
                            <>
                                A full-stack example of creating a passkey (attestation ceremony) and then retrieving it
                                (assertation ceremony) with Firebase Firestore integration to store the passkey and
                                Firebase Auth for issuing a JWT token.
                            </>
                        }
                    />

                    <FirebaseExample />

                    {/* <Words variant='body2' sx={{ mt: 6 }}>
                        TODO: example stack - list of badges (and tooltips) TODO: complete diagrams for registration and
                        login ceremonies
                    </Words> */}
                </Container>
            </ExampleWrapper>

            {/* <FeaturesContainer maxWidth='lg'>
                <Features
                    featuresWithCategory={[
                        {
                            icon: <Add />,
                            name: 'Pros',
                            features: [
                                {
                                    label: 'Feature 1',
                                    description: 'The passkey is stored in Firebase Firestore database.',
                                },
                                {
                                    label: 'Feature 2',
                                    description: 'The email is used as passkey username.',
                                },
                            ],
                        },
                        {
                            icon: <Remove />,
                            name: 'Cons',
                            features: [
                                {
                                    label: 'Feature 1',
                                    description: 'Description 1 of the feature 1 of the pros section',
                                },
                                {
                                    label: 'Feature 2',
                                    description: 'Description 1 of the feature 1 of the pros section',
                                },
                            ],
                        },
                    ]}
                />
            </FeaturesContainer> */}
        </>
    );
};
