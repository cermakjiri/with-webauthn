import {
    EmailField,
    FieldsStack,
    Form,
    FormError,
    PasswordField,
    SubmitButton,
} from '@workspace/common/client/form/components';
import { Box, Button, Divider, Words } from '@workspace/common/client/ui-kit';
import { Send } from '@workspace/common/client/ui-kit/icons';

import { AuthFormContainer } from '../AuthFormContainer';
import { useExampleRouter } from '../DefaultExampleRouter';
import { useRegisterWithEmailAndPassword } from './hooks';
import { registerFormSchema, type RegisterFormSchema, type RegisterFormValues } from './schema';

export const RegisterWithEmailAndPasswordPage = () => {
    const register = useRegisterWithEmailAndPassword();
    const { redirect } = useExampleRouter();

    return (
        <AuthFormContainer>
            <Form<RegisterFormSchema, RegisterFormValues>
                schema={registerFormSchema}
                onSubmit={register}
                mode='onTouched'
            >
                <FieldsStack>
                    <FormError />
                    <EmailField<RegisterFormValues> name='email' autoComplete='email' />
                    <PasswordField<RegisterFormValues> name='password' autoComplete='new-password' />
                </FieldsStack>

                <SubmitButton sx={{ mt: 3 }} endIcon={<Send />}>
                    Register
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
