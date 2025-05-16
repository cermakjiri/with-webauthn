// eslint-disable-next-line @next/next/no-document-import-in-page
import { Head, Html, Main, NextScript, type DocumentContext, type DocumentProps } from 'next/document';
import {
    documentGetInitialProps,
    DocumentHeadTags,
    type DocumentHeadTagsProps,
} from '@mui/material-nextjs/v15-pagesRouter';

interface MyDocumentProps extends DocumentProps, DocumentHeadTagsProps {
    emotionStyleTags: JSX.Element[];
    nonce?: string;
}

function MyDocument({ emotionStyleTags, nonce }: MyDocumentProps) {
    return (
        <Html lang='en'>
            <Head>
                <meta charSet='utf-8' />
                <meta
                    name='description'
                    content='A full-stack WebAuthn example of creating a passkey (attestation ceremony) and then retrieving it (assertation ceremony) with Firebase Firestore integration to store the passkey and Firebase Auth for issuing a JWT token.'
                />
                {/* <meta name='theme-color' content='#D2D119' /> */}
                {/* <link rel='shortcut icon' href='/favicon.ico' /> */}
                {/* <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' /> */}
                {/* <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' /> */}
                {/* <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' /> */}
                {/* <link rel='manifest' href='/manifest.json' /> */}
                <DocumentHeadTags emotionStyleTags={emotionStyleTags} />
            </Head>
            <body>
                <Main />
                <NextScript nonce={nonce} />
            </body>
        </Html>
    );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
    const initialProps = await documentGetInitialProps(ctx);

    return initialProps;
};

export { MyDocument };
