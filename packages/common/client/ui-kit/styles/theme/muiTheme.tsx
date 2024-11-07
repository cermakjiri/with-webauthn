import { createTheme } from '@mui/material';

import { dimensions } from './dimensions';
import { baseFontSize, fontFamily, heading } from './typography';

declare module '@mui/material/styles' {
    interface Theme {
        fontFamily: typeof fontFamily;
        dimensions: typeof dimensions;
    }

    interface ThemeOptions {
        fontFamily: typeof fontFamily;
        dimensions: typeof dimensions;
    }
}

export const theme = createTheme({
    spacing: baseFontSize / 2,

    shape: {
        borderRadius: 8,
    },

    palette: {
        primary: {
            '200': '#f0c24f',
            '500': '#f0c24f',
            A400: '#f0c24f',
        },
    },

    dimensions,
    fontFamily,
    typography: {
        fontSize: baseFontSize,
        htmlFontSize: baseFontSize,
        fontFamily: fontFamily.montserrat,
        h1: heading(32, 40),
        h2: heading(24, 30),
        h3: heading(20, 25),
        h4: heading(18, 22),
    },

    components: {
        MuiButton: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
});

export type Theme = typeof theme;
