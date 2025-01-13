import Link from 'next/link';

import { Container, Words } from '~client/ui-kit';

import { Callout } from './BlogPostCallout.styles';

export interface BlogPostCalloutProps {}

export const BlogPostCallout = ({}: BlogPostCalloutProps) => {
    return (
        <Container>
            <Callout>
                <Words variant='h3' component='h4' sx={{ fontWeight: 'bold', marginBottom: 1.5 }}>
                    Are you developer and want to learn more about WebAuthn and passkeys? 🤓
                </Words>
                <Words variant='body2'>
                    Let me share with you a developer guide to passkeys in my{' '}
                    <Link href='https://www.ackee.agency/blog/welcome-to-the-world-of-passkeys' target='_blank'>
                        Welcome to the world of passkeys
                    </Link>{' '}
                    blog post. 💡
                </Words>
            </Callout>
        </Container>
    );
};
