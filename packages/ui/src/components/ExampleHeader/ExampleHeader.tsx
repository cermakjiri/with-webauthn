import type { ReactNode } from 'react';

import { Words } from '../Words';

export interface ExampleHeaderProps {
    title: ReactNode;
    description: ReactNode;
}

export const ExampleHeader = ({ title, description }: ExampleHeaderProps) => {
    return (
        <>
            <Words variant='h2' sx={{ fontWeight: 'bold' }}>
                {title}
            </Words>
            <Words
                variant='body2'
                mt={1}
                sx={{
                    maxWidth: '600px',
                    textWrap: 'balance',
                    lineHeight: '1.65',
                }}
            >
                {description}
            </Words>
        </>
    );
};
