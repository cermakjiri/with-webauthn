import type { ReactNode } from 'react';
import Link from 'next/link';

export interface ExternalLinkProps {
    children: ReactNode;
    href: string;
}

export const ExternalLink = ({ children, href }: ExternalLinkProps) => {
    return (
        <Link href={href} target='_blank'>
            {children}
        </Link>
    );
};
