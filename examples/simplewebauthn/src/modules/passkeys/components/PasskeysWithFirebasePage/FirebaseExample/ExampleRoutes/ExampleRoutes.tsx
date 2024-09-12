import { useExampleRouter } from '../ExampleRouter';
import { LoginWithPasskey } from '../LoginWithPasskey';
import { Passkeys } from '../Passkeys';
import { RegisterWithPasskey } from '../RegisterWithPasskey';

export const ExampleRoutes = () => {
    const { route } = useExampleRouter();

    switch (route) {
        case '/register':
            return <RegisterWithPasskey />;

        case '/login':
            return <LoginWithPasskey />;

        case '/passkeys':
            return <Passkeys />;
    }
};
