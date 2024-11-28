import { Fingerprint } from '@mui/icons-material';
import type { UseMutationResult } from '@tanstack/react-query';

import { Button, Words } from '~client/ui-kit';

import { Header } from './PasskeysHeader.styles';

export interface PasskeysHeaderProps {
    addPasskey: UseMutationResult<void, any, void>;
}

export const PasskeysHeader = ({ addPasskey }: PasskeysHeaderProps) => {
    return (
        <Header>
            <Words variant='h5'>Passkeys</Words>
            <Button
                variant='contained'
                loading={addPasskey.isPending}
                onClick={() => {
                    addPasskey.mutate();
                }}
                endIcon={<Fingerprint />}
            >
                Add Passkey
            </Button>
        </Header>
    );
};
