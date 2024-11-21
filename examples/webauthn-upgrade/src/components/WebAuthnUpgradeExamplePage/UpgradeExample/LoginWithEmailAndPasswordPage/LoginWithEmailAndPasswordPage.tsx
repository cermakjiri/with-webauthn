import {
    EmailField,
    FieldsStack,
    Form,
    FormError,
    PasswordField,
    SubmitButton,
} from '@workspace/common/client/form/components';
import { Button } from '@workspace/common/client/ui-kit';
import { ArrowBack, Send } from '@workspace/common/client/ui-kit/icons';

import { AuthFormContainer } from '../AuthFormContainer';
import { useExampleRouter } from '../DefaultExampleRouter';
import { useLoginWithEmailAndPassword } from './hooks/useLoginWithEmailAndPassword';
import { loginFormSchema, type LoginFormSchema, type LoginFormValues } from './schema';

export const LoginWithEmailAndPasswordPage = () => {
    const login = useLoginWithEmailAndPassword();
    const { redirect } = useExampleRouter();

    return (
        <>
            <Button variant='text' onClick={() => redirect('/login')} startIcon={<ArrowBack />}>
                Back
            </Button>
            <AuthFormContainer sx={{ justifyContent: 'flex-start', mt: 15, height: 'unset' }}>
                <Form<LoginFormSchema, LoginFormValues> schema={loginFormSchema} onSubmit={login} mode='onTouched'>
                    <FieldsStack>
                        <FormError />
                        <EmailField<LoginFormValues> name='email' autoComplete='email' />
                        <PasswordField<LoginFormValues> name='password' autoComplete='current-password' />
                    </FieldsStack>

                    <SubmitButton sx={{ mt: 3 }} endIcon={<Send />}>
                        Login
                    </SubmitButton>
                </Form>
            </AuthFormContainer>
        </>
    );
};