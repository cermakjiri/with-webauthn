import { useContext } from 'react';

import { AuthContext } from '../contexts';

export function useExampleAuthSession() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useExampleAuthSession must be used within an AuthProvider');
    }

    return context;
}
