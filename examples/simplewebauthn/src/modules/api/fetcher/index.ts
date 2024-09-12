import { Antonio } from '@ackee/antonio-core';

let apiRef: Antonio | null = null;

/**
 * Simple HTTP client based on Fetch API
 */
export const api = () => {
    if (!apiRef) {
        apiRef = new Antonio({
            baseURL: new URL('/api', window.location.origin).toString(),
        });
    }

    return apiRef;
};

export type ApiProps<Body extends Record<string, any>> =
    | {
          method: 'POST' | 'PUT' | 'PATCH';
          body: Body;
          url: string;
      }
    | {
          method: 'GET' | 'DELETE';
          url: string;
      };

/**
 * Makes a Fetch API request
 */
export async function fetcher<
    ResponseBody extends unknown,
    RequestBody extends Record<string, any> = Record<string, any>,
>(props: ApiProps<RequestBody>) {
    return api().request<(typeof props)['method'], ResponseBody>(props);
}
