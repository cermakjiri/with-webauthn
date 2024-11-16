import Link from 'next/link';

import { queryClient } from '@workspace/common/client/api/components';
import { EmailField, Form, FormError, SubmitButton } from '@workspace/common/client/form/components';
import { FieldsStack } from '@workspace/common/client/form/components/';
import { Alert, Box, Button, Divider, Words } from '@workspace/common/client/ui-kit';
import { Fingerprint, InfoOutlined } from '@workspace/common/client/ui-kit/icons';

import { AuthFormContainer } from '../AuthFormContainer';
import { useExampleRouter } from '../DefaultExampleRouter';
import { useConditionalMediation } from './hooks/useConditionalMediation';
import { useLoginWithPasskey } from './hooks/useLoginWithPasskey';
import { loginFormSchema, type LoginFormSchema, type LoginFormValues } from './schema';

export const LoginWithPasskeyPage = () => {
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
                    <EmailField<LoginFormValues>
                        name='email'
                        autoComplete='username webauthn'
                        label='Email (optional)'
                    />
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
