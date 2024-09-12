import { useState } from 'react';

import { ExampleFrame } from '@workspace/ui';

import { ExampleAuth } from './ExampleAuth';
import { ExampleBody } from './ExampleBody';
import { ExampleRouter } from './ExampleRouter';
import { ExampleRoutes } from './ExampleRoutes';
import { ExampleTopBar } from './ExampleTopBar';

export interface FirebaseExampleProps {}

export const FirebaseExample = ({}: FirebaseExampleProps) => {
    const [expanded, setExpanded] = useState(true);

    return (
        <ExampleFrame expanded={expanded}>
            <ExampleAuth>
                <ExampleRouter>
                    <ExampleTopBar expanded={expanded} onToggleExpand={setExpanded} />

                    <ExampleBody>
                        <ExampleRoutes />
                    </ExampleBody>
                </ExampleRouter>
            </ExampleAuth>
        </ExampleFrame>
    );
};
