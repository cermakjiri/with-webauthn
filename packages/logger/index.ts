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

    return logger;
}
