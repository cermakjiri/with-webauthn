import Head from 'next/head';

import { PageHeader } from '@workspace/ui';

export interface MainHeaderProps {
    pageTitle: string;
}

export const MainHeader = ({ pageTitle }: MainHeaderProps) => {
    return (
        <>
            <Head>
                <title>{`${pageTitle} | With WebAuthn`}</title>
            </Head>
            <PageHeader>With WebAuthn demos</PageHeader>
        </>
    );
};
