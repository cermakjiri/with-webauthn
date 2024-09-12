import type { ComponentProps, ElementType } from 'react';
import { Typography, type TypographyProps } from '@mui/material';

type WordOwnProps = {};

export type WordsProps<RootComponent extends ElementType> = WordOwnProps &
    TypographyProps<RootComponent> &
    Omit<ComponentProps<TypographyProps<RootComponent>['component']>, keyof WordOwnProps>;

export const Words = <RootComponent extends ElementType = 'p'>({ children, ...props }: WordsProps<RootComponent>) => {
    return <Typography {...props}>{children}</Typography>;
};
