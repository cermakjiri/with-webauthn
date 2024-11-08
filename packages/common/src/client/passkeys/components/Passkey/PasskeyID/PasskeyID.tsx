import { useCopyTextToClipboard } from '~client/clipboard/hooks';
import { Words, type WordsProps } from '~client/ui-kit';

export interface PasskeyIDProps extends Omit<WordsProps<'h6'>, 'variant' | 'onClick'> {
    value: string;
}

export const PasskeyID = ({ value, sx, ...props }: PasskeyIDProps) => {
    const { mutate } = useCopyTextToClipboard();

    return (
        <Words
            {...props}
            variant='subtitle1'
            sx={{
                fontWeight: 500,
                textWrap: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                cursor: 'copy',
                ...sx,
            }}
            onClick={() => {
                mutate(value);
            }}
        >
            ID #{value}
        </Words>
    );
};
