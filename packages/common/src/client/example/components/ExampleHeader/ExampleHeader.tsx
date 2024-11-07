import type { ReactNode } from 'react';
import { Box } from '@mui/material';

import { Words } from '../../../ui-kit/components/Words';

export interface ExampleHeaderProps {
    title: ReactNode;
    description: ReactNode;
}

export const ExampleHeader = ({ title, description }: ExampleHeaderProps) => {
    return (
        <>
            <Words variant='h2' sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                {title}
            </Words>
            <Box
                mt={1}
                sx={{
                    maxWidth: '800px',
                }}
            >
                {description}
            </Box>
        </>
    );
};
