import { EmailField, FieldsStack, Form, FormError, SubmitButton } from '@workspace/common/client/form/components';
import { Box, Button, Divider, Words } from '@workspace/common/client/ui-kit';
import { Fingerprint } from '@workspace/common/client/ui-kit/icons';

import { AuthFormContainer } from '../AuthFormContainer';
import { useExampleRouter } from '../router';
import { useRegisterWithPasskey } from './hooks';
import { registerFormSchema, type RegisterFormSchema, type RegisterFormValues } from './schema';

export const RegisterWithPasskeyPage = () => {
    const registerPasskey = useRegisterWithPasskey();
    const { redirect } = useExampleRouter();

    return (
        <AuthFormContainer>
            <Form<RegisterFormSchema, RegisterFormValues>
                schema={registerFormSchema}
                defaultValues={{
                    // Some some random email to make it easier for demo users
                    email: `user${Math.floor(Math.random() * 1e3)}@gmail.com`,
                }}
                onSubmit={registerPasskey}
            >
                <FieldsStack>
                    <FormError />
                    <EmailField<RegisterFormValues> name='email' autoComplete='email webauthn' />
                </FieldsStack>

                <SubmitButton sx={{ mt: 3 }} endIcon={<Fingerprint />}>
                    Register with Passkey
                </SubmitButton>
            </Form>

            <Divider sx={{ mt: 5, mb: 2 }} />

            <Box sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Words variant='body2'>Already have an account?</Words>

                <Button variant='text' onClick={() => redirect('/login')}>
                    Login
                </Button>
            </Box>
        </AuthFormContainer>
    );
};
