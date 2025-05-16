import Head from 'next/head';
import Link from 'next/link';
import { GitHub } from '@mui/icons-material';

import { PageDrawer } from '../PageDrawer';
import { IconGithub, LeftSide, PageTitle, StyledContainer } from './PageHeader.styles';

export interface PageHeaderProps {
    pageTitle: string;
}

export const PageHeader = ({ pageTitle }: PageHeaderProps) => {
    return (
        <>
            <Head>
                <title>{`${pageTitle} | With WebAuthn`}</title>
            </Head>
            <StyledContainer
                maxWidth='xl'
                // @ts-expect-error
                component='header'
            >
                <LeftSide>
                    <PageDrawer />
                    <PageTitle variant='h1'>With WebAuthn demos</PageTitle>
                </LeftSide>
                <Link
                    href='https://github.com/cermakjiri/with-webauthn'
                    target='_blank'
                    title='A repository with full stack WebAuthn API examples.'
                >
                    <IconGithub icon={GitHub} sx={{ pr: 1.5 }} />
                </Link>
            </StyledContainer>
        </>
    );
};
