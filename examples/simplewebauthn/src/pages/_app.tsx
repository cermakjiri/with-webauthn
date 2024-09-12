import 'normalize.css';
import 'reset.css';

import type { AppProps } from 'next/app';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { IntlProvider } from 'react-intl';

import { EmotionClient, type EmotionClientProps } from '@workspace/ui';

import { AppQueryProvider } from '~modules/api/components';
import { SnackbarProvider } from '~modules/snackbar/components';

export interface ExtendedAppProps extends AppProps {
    emotionCache: EmotionClientProps['emotionCache'];
    pageProps: {
        dehydratedState: unknown;
        [key: string]: unknown;
    };
}

function App({ Component, pageProps: { dehydratedState, ...pageProps }, emotionCache }: ExtendedAppProps) {
    return (
        <EmotionClient emotionCache={emotionCache}>
            <AppQueryProvider dehydratedState={dehydratedState}>
                <IntlProvider locale='en' messages={{}}>
                    <Component {...pageProps} />
                    <SnackbarProvider />
                </IntlProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </AppQueryProvider>
        </EmotionClient>
    );
}

export default App;
