import type { AppType } from 'next/app';
import Document, { Head, Html, Main, NextScript, type DocumentContext, type DocumentProps } from 'next/document';

import { createEmotionCacheWithStyleTags } from '@workspace/ui';

import { env } from '~env';

interface MyDocumentProps extends DocumentProps {
    emotionStyleTags: JSX.Element[];
}

function MyDocument({ emotionStyleTags }: MyDocumentProps) {
    return (
        <Html lang='en'>
            <Head>
                <meta charSet='utf-8' />
                {/* TODO: */}
                {/* <meta name='theme-color' content='#D2D119' /> */}
                <meta name='emotion-insertion-point' content='' />
                {env.NEXT_PUBLIC_NODE_ENV !== 'production' && (
                    <meta
                        name='robots'
                        content='noindex, nofollow, none, noarchive, nositelinkssearchbox, nosnippet, notranslate, noimageindex'
                    />
                )}
                {/* TODO: */}
                {/* <link rel='shortcut icon' href='/favicon.ico' /> */}
                {/* <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' /> */}
                {/* <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' /> */}
                {/* <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' /> */}
                {/* <link rel='manifest' href='/manifest.json' /> */}
                {emotionStyleTags}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
    const originalRenderPage = ctx.renderPage;

    const initialProps = await Document.getInitialProps(ctx);
    const { emotionCache, emotionStyleTags } = createEmotionCacheWithStyleTags(initialProps);

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App: React.ComponentType<React.ComponentProps<AppType>>) =>
                function EnhanceApp(props) {
                    return (
                        <App
                            // @ts-expect-error
                            emotionCache={emotionCache}
                            {...props}
                        />
                    );
                },
        });

    return {
        ...initialProps,
        emotionStyleTags,
    };
};

export default MyDocument;
