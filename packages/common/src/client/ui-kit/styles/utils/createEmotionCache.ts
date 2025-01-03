import createCache from '@emotion/cache';
import type { EmotionCache } from '@emotion/react';

// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.
// This assures that MUI styles are loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
export function createEmotionCache() {
    let insertionPoint;

    const isBrowser = typeof document !== 'undefined';

    if (isBrowser) {
        const emotionInsertionPoint = document.querySelector<HTMLMetaElement>('meta[name="emotion-insertion-point"]');

        insertionPoint = emotionInsertionPoint ?? undefined;
    }

    return createCache({ key: 'mui-style', insertionPoint }) as unknown as EmotionCache;
}
