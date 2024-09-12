import { Box, InfoTooltip, Words } from '@workspace/ui';

export interface CounterProps {
    value: number;
}

export const Counter = ({ value }: CounterProps) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, mt: 0.5 }}>
            <Words variant='caption'>Used {value} times.</Words>
            <InfoTooltip
                title={
                    <>
                        How many times the credential has been used so far.
                        <br />
                        For privacy reasons, Apple or Brave, for example, does not update this value.
                    </>
                }
            />
        </Box>
    );
};
