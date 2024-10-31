import type { ReactNode } from 'react';

import { Words } from '../Words';
import { Feature, Features } from './ExampleDescription.styles';

export interface ExampleDescriptionProps {
    description: ReactNode;
    features?: ReactNode[];
}

export const ExampleDescription = ({ description, features = [] }: ExampleDescriptionProps) => {
    return (
        <>
            <Words variant='body2' mb={features.length === 0 ? 0 : 1.25}>
                {description}
            </Words>

            {features.length > 0 && (
                <Features>
                    {features.map((features, index) => (
                        <Feature key={index} variant='body2' component='li'>
                            {features}
                        </Feature>
                    ))}
                </Features>
            )}
        </>
    );
};
