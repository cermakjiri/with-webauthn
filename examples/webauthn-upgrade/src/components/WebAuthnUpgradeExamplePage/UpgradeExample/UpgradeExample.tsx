import { useState } from 'react';

import { ExampleAuth, ExampleBody, ExampleFrame } from '@workspace/common/client/example/components';

import { DefaultExampleTopBar } from './DefaultExampleTopBar';
import { EmailVerificationCode } from './EmailVerificationCode';
import { EmailVerifiedAlert } from './EmailVerifiedAlert';
import { ResolveInitRoute } from './ResolveInitRoute';
import { CurrentExampleRoute, ExampleRouter } from './router';
import { exampleRoutes } from './routes';

export const UpgradeExample = () => {
    const [expanded, setExpanded] = useState(true);

    return (
        <ExampleFrame expanded={expanded}>
            <ExampleRouter routes={exampleRoutes}>
                <EmailVerificationCode>
                    <ExampleAuth>
                        <ResolveInitRoute />

                        <DefaultExampleTopBar expanded={expanded} onToggleExpand={setExpanded} />

                        <ExampleBody>
                            <EmailVerifiedAlert />
                            <CurrentExampleRoute />
                        </ExampleBody>
                    </ExampleAuth>
                </EmailVerificationCode>
            </ExampleRouter>
        </ExampleFrame>
    );
};
