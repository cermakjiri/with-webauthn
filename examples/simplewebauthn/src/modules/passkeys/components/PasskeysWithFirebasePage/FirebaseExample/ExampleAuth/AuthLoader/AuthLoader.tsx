import { Loader, LoaderContainer } from '@workspace/ui';

export interface AuthLoaderProps {}

export const AuthLoader = ({}: AuthLoaderProps) => {
    return (
        <LoaderContainer height='fullPage'>
            <Loader />
        </LoaderContainer>
    );
};
