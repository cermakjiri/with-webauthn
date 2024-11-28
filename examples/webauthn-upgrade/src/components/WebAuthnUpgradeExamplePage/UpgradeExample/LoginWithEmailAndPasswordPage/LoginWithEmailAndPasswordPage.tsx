import { useQueryState } from 'nuqs';

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
import { useExampleRouter } from '../router';
import { useLoginWithEmailAndPassword } from './hooks/useLoginWithEmailAndPassword';
import { loginFormSchema, type LoginFormSchema, type LoginFormValues } from './schema';

export const LoginWithEmailAndPasswordPage = () => {
    const [email, setEmail] = useQueryState('email');
    const login = useLoginWithEmailAndPassword({
        onSuccess() {
            setEmail(null);
        },
    });

    const { redirect } = useExampleRouter();

    return (
        <>
            <Button variant='text' onClick={() => redirect('/login')} startIcon={<ArrowBack />}>
                Back
            </Button>
            <AuthFormContainer sx={{ justifyContent: 'flex-start', mt: 15, height: 'unset' }}>
                <Form<LoginFormSchema, LoginFormValues>
                    schema={loginFormSchema}
                    onSubmit={login}
                    mode='onTouched'
                    defaultValues={email ? { email } : {}}
                >
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
