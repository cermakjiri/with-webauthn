import { useMutation } from '@tanstack/react-query';

import { logger } from '~logger';
import { useSnack } from '~modules/snackbar/hooks';

export function useCopyTextToClipboard() {
    const snack = useSnack();

    return useMutation({
        mutationFn: async (text: string) => {
            const blob = new Blob([text], { type: 'text/plain' });

            const clipboardItem = new ClipboardItem({
                [blob.type]: Promise.resolve(blob),
            });

            await navigator.clipboard.write([clipboardItem]);
        },
        onError: logger.error,
        onSuccess: () => {
            snack('success', 'Copied to clipboard');
        },
    });
}
