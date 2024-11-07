import Head from 'next/head';

import { PageHeader } from '~client/ui-kit';

export interface MainHeaderProps {
    pageTitle: string;
}

export const MainHeader = ({ pageTitle }: MainHeaderProps) => {
    return (
        <>
            <Head>
                <title>{`${pageTitle} | With WebAuthn`}</title>
            </Head>
            <PageHeader>With WebAuthn demo</PageHeader>
        </>
    );
};
