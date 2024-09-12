import type { ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';

import { theme } from '../../theme';

export interface ThemeProviderProps {
    children: ReactNode | ReactNode[];
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
};
