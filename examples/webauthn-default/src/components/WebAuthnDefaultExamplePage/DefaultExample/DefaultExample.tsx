import { useState } from 'react';

import { ExampleAuth, ExampleBody, ExampleFrame } from '@workspace/common/client/example/components';

import { DefaultExampleTopBar } from './DefaultExampleTopBar';
import { ResolveInitRoute } from './ResolveInitRoute';
import { CurrentExampleRoute, ExampleRouter } from './router';
import { exampleRoutes } from './routes';

export const DefaultExample = () => {
    const [expanded, setExpanded] = useState(true);

    return (
        <ExampleFrame expanded={expanded}>
            <ExampleRouter routes={exampleRoutes}>
                <ExampleAuth>
                    <ResolveInitRoute />

                    <DefaultExampleTopBar expanded={expanded} onToggleExpand={setExpanded} />

                    <ExampleBody>
                        <CurrentExampleRoute />
                    </ExampleBody>
                </ExampleAuth>
            </ExampleRouter>
        </ExampleFrame>
    );
};
