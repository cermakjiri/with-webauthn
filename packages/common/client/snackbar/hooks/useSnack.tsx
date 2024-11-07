import { useCallback, type ReactNode } from 'react';
import { toast as toasts, type ToastOptions } from 'react-toastify';

import { Alert, alertClasses, Words } from '~client/ui-kit';

export function useSnack() {
    return useCallback((type: 'success' | 'error', message: ReactNode, options?: ToastOptions) => {
        const toast = toasts[type];

        const toastId = toast(
            <>
                <Alert
                    severity={type}
                    onClose={() => {
                        toasts.dismiss(toastId);
                    }}
                    sx={theme => ({
                        display: 'flex',
                        alignItems: 'flex-start',
                        [`& .${alertClasses.icon}`]: {
                            alignSelf: 'center',
                        },
                    })}
                >
                    <Words variant='body1'>{message}</Words>
                </Alert>
            </>,
            {
                closeButton: false,
                autoClose: 7_000,
                ...options,
            },
        );

        return { ...toasts, toastId };
    }, []);
}
