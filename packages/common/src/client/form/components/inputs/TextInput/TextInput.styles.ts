import { formHelperTextClasses, inputLabelClasses, outlinedInputClasses, styled, TextField } from '@mui/material';

import type { TextInputProps } from './TextInput';

export const StyledTextInput = styled(TextField)<TextInputProps>(({ theme, width }) => ({
    width: typeof width === 'number' ? theme.spacing(width) : width,

    /* Chorme, Safari - input type number - value arrows removal */
    'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
        margin: 0,
    },
    /* Firefox - input type number - value arrows removal*/
    'input[type=number]': {
        MozAppearance: 'textfield',
    },

    [`& > .${outlinedInputClasses.root}`]: {
        fontSize: '1rem',
        height: 48,

        [`& .${outlinedInputClasses.input}:not(.${outlinedInputClasses.inputMultiline})`]: {},
    },

    [`& .${inputLabelClasses.root}:not(.${inputLabelClasses.shrink})`]: {
        fontSize: '1rem',
        transform: 'translate(14px, 12px) scale(1)',
    },

    [`& .${formHelperTextClasses.root}`]: {
        marginTop: '0.25rem',
        marginLeft: 15,
        fontSize: '0.625rem',
        lineHeight: 1,
    },
}));
