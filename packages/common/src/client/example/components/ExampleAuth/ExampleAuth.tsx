import type { ReactNode } from 'react';

import { AuthLoader } from './AuthLoader';
import { AuthProvider } from './AuthProvider';

export interface ExampleAuthProps {
    children: ReactNode;
}

export const ExampleAuth = ({ children }: ExampleAuthProps) => {
    return <AuthProvider Loader={AuthLoader}>{children}</AuthProvider>;
};
