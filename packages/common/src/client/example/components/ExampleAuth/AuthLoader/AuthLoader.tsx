import { Loader, LoaderContainer } from '~client/ui-kit';

export interface AuthLoaderProps {}

export const AuthLoader = ({}: AuthLoaderProps) => {
    return (
        <LoaderContainer height='fullPage'>
            <Loader />
        </LoaderContainer>
    );
};
