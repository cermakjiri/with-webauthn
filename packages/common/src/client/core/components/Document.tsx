import type { AppType } from 'next/app';
// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Head, Html, Main, NextScript, type DocumentContext, type DocumentProps } from 'next/document';

import { createEmotionCacheWithStyleTags } from '~client/ui-kit/styles';

interface MyDocumentProps extends DocumentProps {
    emotionStyleTags: JSX.Element[];
}

function MyDocument({ emotionStyleTags }: MyDocumentProps) {
    return (
        <Html lang='en'>
            <Head>
                <meta charSet='utf-8' />
                <meta
                    name='description'
                    content='A full-stack WebAuthn example of creating a passkey (attestation ceremony) and then retrieving it (assertation ceremony) with Firebase Firestore integration to store the passkey and Firebase Auth for issuing a JWT token.'
                />
                {/* <meta name='theme-color' content='#D2D119' /> */}
                <meta name='emotion-insertion-point' content='' />
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

export { MyDocument };
