import { useCallback, useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldValues, ResolverOptions, ResolverResult } from 'react-hook-form';

import type { UnkownFormSchema } from '~client/form/types';

export type LocalizedZodResolver = <TFieldValues extends FieldValues, TContext>(
    values: TFieldValues,
    context: TContext | undefined,
    options: ResolverOptions<TFieldValues>,
) => Promise<ResolverResult<TFieldValues>>;

/**
 * Extend the zodResolver with the ability to translate the error messages.
 */
export function useLocalizedResolver<Schema extends UnkownFormSchema>(schema: Schema): ReturnType<typeof zodResolver> {
    const schemaResolver = useMemo(() => zodResolver(schema), [schema]);

    return useCallback<LocalizedZodResolver>(
        async (values, context, options) => {
            const result = await schemaResolver(values, context, options);

            return {
                ...result,
                // NOTE: translate the error messages here
            };
        },
        [schemaResolver],
    );
}
