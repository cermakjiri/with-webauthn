import { decomposeColor } from '@mui/material';

/**
 *
 * @param hexColor e.g: #0000
 * @param alpha <0,1> e.g.: 0.15
 * @returns
 */
export function hexToRgba(hexColor: string, alpha: number) {
    return `rgba(${decomposeColor(hexColor).values.join(', ')}, ${alpha})`;
}
