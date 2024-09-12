export function resolveRelProps(rel: string | undefined, target: string | undefined) {
    const relSet = new Set(rel?.split(' ') ?? []);

    if (target === '_blank') {
        /**
         * `rel="noopener"` sets window.opener to null, so it can't be used to get access to the window object and potentially do malicious things.
         * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/noopener
         */
        relSet.add('noopener');
    }

    return Array.from(relSet).join(' ');
}
