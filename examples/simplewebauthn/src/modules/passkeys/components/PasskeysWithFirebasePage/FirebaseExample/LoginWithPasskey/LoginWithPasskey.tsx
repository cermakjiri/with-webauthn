import Link from 'next/link';

import { Alert, Box, Button, Divider, FieldsStack, FormError, Words } from '@workspace/ui';
import { Fingerprint, InfoOutlined } from '@workspace/ui/icons';

import { queryClient } from '~modules/api/components';
import { EmailField, Form, SubmitButton } from '~modules/form/components';

import { AuthFormContainer } from '../AuthFormContainer';
import { useExampleRouter } from '../ExampleRouter';
import { useConditionalMediation } from './hooks/useConditionalMediation';
import { useLoginWithPasskey } from './hooks/useLoginWithPasskey';
import { loginFormSchema, type LoginFormSchema, type LoginFormValues } from './schema';

export const LoginWithPasskey = () => {
    const conditionalMediation = useConditionalMediation();
    const loginWithPasskey = useLoginWithPasskey();
    const { redirect } = useExampleRouter();
    const cancelConditionalMediation = async () => {
        /**
         * Cancel the conditional mediation before submitting the login form.
         * Only one navigator.credentials.get() call can be active at a time.
         */
        await queryClient.cancelQueries(conditionalMediation);
    };

    return (
        <AuthFormContainer>
            {conditionalMediation.data === false && (
                <Alert severity='info' icon={<InfoOutlined />} sx={{ mb: 3 }}>
                    <Words variant='body2'>
                        WebAuthn Passkeys Autofill (Conditional UI) is not supported by your browser. Checkout current{' '}
                        <Link
                            href='https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredential/isConditionalMediationAvailable_static'
                            target='_blank'
                        >
                            browser support
                        </Link>
                        .
                    </Words>
                </Alert>
            )}

            <Form<LoginFormSchema, LoginFormValues>
                schema={loginFormSchema}
                onSubmit={async (values, form) => {
                    await cancelConditionalMediation();

                    await loginWithPasskey(values, form);
                }}
            >
                <FieldsStack>
                    <FormError />
                    <EmailField<LoginFormValues> name='email' autoComplete='username webauthn' />
                </FieldsStack>

                <SubmitButton sx={{ mt: 3 }} endIcon={<Fingerprint />}>
                    Login with Passkey
                </SubmitButton>
            </Form>

            <Divider sx={{ mt: 5, mb: 2 }} />

            <Box sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Words variant='body2'>Don&apos;t have any account yet?</Words>

                <Button
                    variant='text'
                    onClick={async () => {
                        await cancelConditionalMediation();

                        redirect('/register');
                    }}
                >
                    Register
                </Button>
            </Box>
        </AuthFormContainer>
    );
};
