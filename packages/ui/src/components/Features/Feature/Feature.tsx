import { Box } from '@mui/material';

import { Words } from '../../Words';

export interface FeatureProps {
    label: string;
    description: string;
}

export const Feature = ({ label, description }: FeatureProps) => {
    return (
        <Box>
            <Words
                variant='caption'
                sx={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                }}
            >
                {label}
            </Words>
            <Words component='p' variant='caption'>
                {description}
            </Words>
        </Box>
    );
};
