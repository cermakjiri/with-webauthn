import { captureException, setExtras } from '@sentry/browser';
import type { Extras } from '@sentry/types';
import { getLogger } from 'loglevel';

export function createLogger(
    name: string,
    props: {
        outputToConsole: boolean;
    },
) {
    const logger = getLogger(name);

    if (props.outputToConsole) {
        logger.enableAll(true);
    } else {
        logger.disableAll();
    }

    const logError = logger.error;

    return {
        ...logger,
        error: (error: any, extras?: Extras) => {
            if (extras) {
                setExtras(extras);
            }

            captureException(error);

            logError(error, extras);
        },
    };
}
