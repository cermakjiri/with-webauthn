// eslint-disable-next-line @next/next/no-document-import-in-page
import type { DocumentInitialProps } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';

import { createEmotionCache } from './createEmotionCache';

export function createEmotionCacheWithStyleTags(initialProps: DocumentInitialProps) {
    const emotionCache = createEmotionCache();
    const { extractCriticalToChunks } = createEmotionServer(emotionCache);

    // This is important. It prevents Emotion to render invalid HTML.
    // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map((style: any) => (
        <style
            data-emotion={`${style.key} ${style.ids.join(' ')}`}
            key={style.key}
            dangerouslySetInnerHTML={{ __html: style.css }}
        />
    ));

    return {
        emotionCache,
        emotionStyleTags,
    } as const;
}
