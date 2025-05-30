import { captureException, setExtras } from '@sentry/nextjs';
import { getLogger } from 'loglevel';

type Extras = Parameters<typeof setExtras>[0];

export function createLogger(
    name: string,
    props: {
        outputToConsole: boolean;
        /**
         * If returns true, the error will be captured by Sentry.
         */
        captureExceptionFilter?: (error: Error) => boolean;
    },
) {
    const logger = getLogger(name);

    if (props.outputToConsole) {
        logger.enableAll(true);
    } else {
        logger.disableAll();
    }

    const logError = logger.error;
    const { captureExceptionFilter = () => true } = props;

    return {
        ...logger,
        error: (error: any, extras?: Extras) => {
            if (extras) {
                setExtras(extras);
            }

            if (captureExceptionFilter(error)) {
                captureException(error);
            }

            logError(error, extras);
        },
    };
}
