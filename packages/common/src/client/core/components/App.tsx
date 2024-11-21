import 'normalize.css';
import 'reset.css';

import type { AppProps } from 'next/app';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/next/pages';
import { IntlProvider } from 'react-intl';

import { AppQueryProvider } from '~client/api/components';
import { SnackbarProvider } from '~client/snackbar/components';
import { EmotionClient, type EmotionClientProps } from '~client/ui-kit/styles';

export interface ExtendedAppProps extends AppProps {
    emotionCache: EmotionClientProps['emotionCache'];
    pageProps: {
        dehydratedState: unknown;
        [key: string]: unknown;
    };
}

export function App({ Component, pageProps: { dehydratedState, ...pageProps }, emotionCache }: ExtendedAppProps) {
    return (
        <EmotionClient emotionCache={emotionCache}>
            <AppQueryProvider dehydratedState={dehydratedState}>
                <IntlProvider locale='en' messages={{}}>
                    <NuqsAdapter>
                        <Component {...pageProps} />
                    </NuqsAdapter>
                    <SnackbarProvider />
                </IntlProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </AppQueryProvider>
        </EmotionClient>
    );
}
