import { createExampleRouter } from '@workspace/common/client/example/components';

import type { ExampleRoutes } from '../routes';

const { ExampleRouter, useExampleRouter, CurrentExampleRoute } = createExampleRouter<ExampleRoutes>();

export { CurrentExampleRoute, ExampleRouter, useExampleRouter };
