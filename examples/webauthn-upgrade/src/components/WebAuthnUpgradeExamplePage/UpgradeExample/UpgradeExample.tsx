import { useState } from 'react';

import { ExampleAuth, ExampleBody, ExampleFrame } from '@workspace/common/client/example/components';

import { CurrentExampleRoute, DefaultExampleRouter } from './DefaultExampleRouter';
import { DefaultExampleTopBar } from './DefaultExampleTopBar';
import { EmailVerifiedAlert } from './EmailVerifiedAlert';
import { exampleRoutes } from './routes';

export const UpgradeExample = () => {
    const [expanded, setExpanded] = useState(true);

    return (
        <ExampleFrame expanded={expanded}>
            <ExampleAuth>
                <DefaultExampleRouter routes={exampleRoutes}>
                    <DefaultExampleTopBar expanded={expanded} onToggleExpand={setExpanded} />

                    <ExampleBody>
                        <EmailVerifiedAlert />
                        <CurrentExampleRoute />
                    </ExampleBody>
                </DefaultExampleRouter>
            </ExampleAuth>
        </ExampleFrame>
    );
};