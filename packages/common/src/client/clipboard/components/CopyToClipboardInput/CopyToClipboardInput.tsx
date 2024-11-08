import { useCopyTextToClipboard } from '~client/clipboard/hooks';

import { Textarea } from './CopyToClipboardInput.styles';

export interface CopyToClipboardInputProps {
    value: string;
}

export const CopyToClipboardInput = ({ value }: CopyToClipboardInputProps) => {
    const { isPending, mutate } = useCopyTextToClipboard();

    return (
        <Textarea
            readOnly
            disabled={isPending}
            onClick={() => {
                mutate(value);
            }}
            value={value}
        />
    );
};
