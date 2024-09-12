import { Montserrat } from 'next/font/google';
import type { TypographyStyleOptions } from '@mui/material/styles/createTypography';

const montserrat = Montserrat({
    weight: ['400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    preload: true,
});

export const fontFamily = {
    montserrat: montserrat.style.fontFamily as 'Montserrat',
} as const;

export const baseFontSize = 16;

const roundTo = (value: number, roundTo: number) => {
    const exp = 10 ** roundTo;

    return Math.round(value * exp) / exp;
};

/**
 *
 * @param fontSize in px
 * @param lineHeight in px
 * @returns
 */
export const sizeAndHeight = <FontSize extends number, LineHeight extends number>(
    fontSize: FontSize,
    lineHeight?: LineHeight,
) =>
    ({
        fontSize: `${roundTo(fontSize / baseFontSize, 2)}rem`,
        ...(lineHeight && {
            lineHeight: `${roundTo(lineHeight / fontSize, 2)}`,
        }),
    }) as const;

export const heading = (fontSize: number, lineHeight?: number): TypographyStyleOptions => ({
    ...sizeAndHeight(fontSize, lineHeight),
    fontFamily: fontFamily.montserrat,
    fontWeight: 400,
    marginBottom: 0,
    marginTop: 0,
});

export const body = (
    fontSize: number,
    lineHeight: number,
    fontWeight: TypographyStyleOptions['fontWeight'] & number,
): TypographyStyleOptions => ({
    ...sizeAndHeight(fontSize, lineHeight),
    fontFamily: fontFamily.montserrat,
    fontWeight,
    marginBottom: 0,
    marginTop: 0,
});
