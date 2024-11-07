import { useMutation } from '@tanstack/react-query';

import { useSnack } from '~client/snackbar/hooks';
import { logger } from '~logger';

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
        onError(error) {
            logger.error(error);
        },
        onSuccess: () => {
            snack('success', 'Copied to clipboard');
        },
    });
}