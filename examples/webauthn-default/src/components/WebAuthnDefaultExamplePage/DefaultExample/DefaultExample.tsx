import { useState } from 'react';

import { ExampleAuth, ExampleBody, ExampleFrame } from '@workspace/common/client/example/components';

import { CurrentExampleRoute, DefaultExampleRouter } from './DefaultExampleRouter';
import { DefaultExampleTopBar } from './DefaultExampleTopBar';
import { exampleRoutes } from './routes';

export const DefaultExample = () => {
    const [expanded, setExpanded] = useState(true);

    return (
        <ExampleFrame expanded={expanded}>
            <ExampleAuth>
                <DefaultExampleRouter routes={exampleRoutes}>
                    <DefaultExampleTopBar expanded={expanded} onToggleExpand={setExpanded} />

                    <ExampleBody>
                        <CurrentExampleRoute />
                    </ExampleBody>
                </DefaultExampleRouter>
            </ExampleAuth>
        </ExampleFrame>
    );
};
