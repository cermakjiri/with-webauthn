import type { EmotionCache } from '@emotion/react';
import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter';

import { ThemeProvider } from '../ThemeProvider';

export interface EmotionClientProps {
    emotionCache: EmotionCache;
    children: React.ReactNode;
}

export const EmotionClient = ({ children, emotionCache }: EmotionClientProps) => {
    return (
        <AppCacheProvider emotionCache={emotionCache}>
            <ThemeProvider>{children}</ThemeProvider>
        </AppCacheProvider>
    );
};
