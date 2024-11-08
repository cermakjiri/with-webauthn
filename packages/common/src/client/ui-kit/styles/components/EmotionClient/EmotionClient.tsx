import { CacheProvider } from '@emotion/react';

import { createEmotionCache } from '../../utils/createEmotionCache';
import { ThemeProvider } from '../ThemeProvider';

export interface EmotionClientProps {
    emotionCache: ReturnType<typeof createEmotionCache>;
    children: React.ReactNode;
}

export const EmotionClient = ({ children, emotionCache = createEmotionCache() }: EmotionClientProps) => {
    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider>{children}</ThemeProvider>
        </CacheProvider>
    );
};
