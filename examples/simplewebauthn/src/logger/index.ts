import { createLogger } from '@workspace/logger';

import { env } from '~env';

export const logger = createLogger('app', {
    outputToConsole: env.NEXT_PUBLIC_NODE_ENV !== 'production',
});
