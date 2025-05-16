import type { ReactNode } from 'react';
import Link from 'next/link';
import { GitHub } from '@mui/icons-material';
import { Box } from '@mui/material';

import { Button } from '~client/ui-kit';

import { Words } from '../../../ui-kit/components/Words';

export interface ExampleHeaderProps {
    title: ReactNode;
    description: ReactNode;
    githubUrl: string;
}

export const ExampleHeader = ({ title, description, githubUrl }: ExampleHeaderProps) => {
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
            <Box mt={1.5}>
                <Button
                    LinkComponent={Link}
                    // @ts-expect-error
                    target='_blank'
                    href={githubUrl}
                    startIcon={<GitHub />}
                    variant='text'
                    sx={theme => ({ color: theme.palette.text.primary })}
                >
                    View on Github
                </Button>
            </Box>
        </>
    );
};
