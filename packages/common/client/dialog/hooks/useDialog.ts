import { useState } from 'react';

export function useDialog<T>(initialOpen = false) {
    const [open, setOpen] = useState(initialOpen);
    const [data, setData] = useState<T | null>(null);

    return {
        open,
        data,
        openDialog(data: T) {
            setData(data);
            setOpen(true);
        },
        closeDialog() {
            setOpen(false);
            setData(null);
        },
    };
}
