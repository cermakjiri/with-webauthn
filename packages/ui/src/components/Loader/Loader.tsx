import type { CircularProgressProps } from '@mui/material';

import { StyledLoader } from './Loader.styles';

export type LoaderProps = CircularProgressProps;

export const Loader = (props: LoaderProps) => {
    return <StyledLoader {...props} />;
};
