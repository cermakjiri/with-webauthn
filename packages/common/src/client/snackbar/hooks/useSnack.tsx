// @ts-ignore
import { useCallback, type ReactNode } from 'react';
import { toast as toasts, type ToastOptions } from 'react-toastify';

import { Alert, alertClasses, Words } from '~client/ui-kit';

export type * from 'react-toastify';

export type SnackType = 'success' | 'error';

export type UseSnack = (
    type: SnackType,
    message: ReactNode,
    options?: ToastOptions,
) => Readonly<(typeof toasts)[SnackType]>;

export function useSnack() {
    return useCallback<UseSnack>((type, message, options) => {
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

        return { ...toasts, toastId } as const;
    }, []);
}
