import Error from 'next/error';
import { captureUnderscoreErrorException } from '@sentry/nextjs';

export const CustomError = (props: any) => {
    return <Error statusCode={props.statusCode} />;
};

CustomError.getInitialProps = async (contextData: any) => {
    // In case this is running in a serverless function, await this in order to give Sentry
    // time to send the error before the lambda exits
    await captureUnderscoreErrorException(contextData);

    // This will contain the status code of the response
    return Error.getInitialProps(contextData);
};
