import { createLogger } from '@workspace/logger';

const ignoredErrorMessages = [
    'The operation either timed out or was not allowed.',
    'The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission',
    'The authenticator was previously registered',
    'Failed to fetch',
] as const;

export const logger = createLogger('app', {
    outputToConsole: true,
    captureExceptionFilter: error => {
        if (ignoredErrorMessages.some(ignoredErrorMessage => ignoredErrorMessage.startsWith(error.message))) {
            return false;
        }

        return true;
    },
});
