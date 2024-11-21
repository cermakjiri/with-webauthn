import { Alert, Box, Button, Divider, Stack, Words } from '@workspace/common/client/ui-kit';
import { Email, Fingerprint, Google } from '@workspace/common/client/ui-kit/icons';

import { AuthFormContainer } from '../AuthFormContainer';
import { useExampleRouter } from '../DefaultExampleRouter';
import { useLoginWithPasskey } from './hooks/useLoginWithPasskey';

export const LoginWithPasskeyPage = () => {
    const loginWithPasskey = useLoginWithPasskey();
    const { redirect } = useExampleRouter();

    return (
        <>
            <AuthFormContainer>
                <Stack gap={3}>
                    {loginWithPasskey.error && <Alert severity='error'>{loginWithPasskey.error.message}</Alert>}

                    <Button
                        fullWidth
                        endIcon={<Fingerprint />}
                        type='submit'
                        loading={loginWithPasskey.isPending}
                        onClick={() => loginWithPasskey.mutate()}
                    >
                        Login with Passkey
                    </Button>
                </Stack>

                <Stack gap={2} mt={2}>
                    <Words
                        component='p'
                        variant='body2'
                        sx={theme => ({
                            textAlign: 'center',
                            color: theme.palette.text.secondary,
                        })}
                    >
                        Or continue with
                    </Words>

                    <Button
                        variant='outlined'
                        color='secondary'
                        startIcon={<Email />}
                        onClick={() => redirect('/login-with-password')}
                    >
                        Email
                    </Button>
                    <Button
                        variant='outlined'
                        color='secondary'
                        startIcon={<Google />}
                        onClick={() =>
                            alert(
                                'Not implemented. Just a UI example.\nYou can sign-in with your email/password or with your passkey.',
                            )
                        }
                    >
                        Google
                    </Button>
                </Stack>

                <Divider sx={{ mt: 5, mb: 2 }} />

                <Box sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Words variant='body2'>Don&apos;t have any account yet?</Words>

                    <Button
                        variant='text'
                        onClick={async () => {
                            redirect('/register');
                        }}
                    >
                        Register
                    </Button>
                </Box>
            </AuthFormContainer>
        </>
    );
};
