import { Fragment, type ReactNode } from 'react';
import { Divider, Stack } from '@mui/material';

import { CategoryName } from './CategoryName';
import { Feature } from './Feature';
import { CategoryFeatures } from './Features.styles';

export interface FeaturesProps {
    featuresWithCategory: {
        icon?: ReactNode;
        name: string;
        features: {
            label: string;
            description: string;
        }[];
    }[];
}

export const Features = ({ featuresWithCategory }: FeaturesProps) => {
    return (
        <>
            {featuresWithCategory.map(({ icon, name, features }, index) => (
                <Fragment key={index}>
                    <CategoryFeatures>
                        <CategoryName icon={icon} name={name} />

                        <Stack gap={2}>
                            {features.map(({ label, description }, index) => (
                                <Feature key={index} label={label} description={description} />
                            ))}
                        </Stack>
                    </CategoryFeatures>

                    {index < featuresWithCategory.length - 1 && (
                        <CategoryFeatures>
                            <div />
                            <Divider />
                        </CategoryFeatures>
                    )}
                </Fragment>
            ))}
        </>
    );
};
