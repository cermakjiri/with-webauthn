import type { ReactNode } from 'react';

import { Words } from '../../Words';

export interface CategoryNameProps {
    icon: ReactNode;
    name: string;
}

export const CategoryName = ({ icon, name }: CategoryNameProps) => {
    return (
        <Words variant='h3' sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
            {icon}
            <span>{name}</span>
        </Words>
    );
};
