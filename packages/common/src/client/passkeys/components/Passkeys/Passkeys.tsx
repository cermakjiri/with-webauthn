import { Fingerprint } from '@mui/icons-material';
import type { UseMutationResult } from '@tanstack/react-query';

import { QueryError, QueryLoader } from '~client/api/components';
import { Button, Words } from '~client/ui-kit';

import { Passkey, type PasskeyProps } from '../Passkey/Passkey';
import { useFetchPasskeys } from './hooks/useFetchPasskeys';
import { PasskeysHeader, PasskeysList } from './Passkeys.styles';

export interface PasskeysProps {
    addPasskey: UseMutationResult<void, any, void>;
    removePasskey: PasskeyProps['removePasskey'];
}

export const Passkeys = ({ addPasskey, removePasskey }: PasskeysProps) => {
    const passkeysResult = useFetchPasskeys();

    return (
        <>
            <PasskeysHeader>
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
            </PasskeysHeader>
            <QueryError result={passkeysResult} message='Loading your passkeys have failed. Please try it again later.'>
                <QueryLoader result={passkeysResult}>
                    <PasskeysList>
                        {passkeysResult.data.map(passkey => (
                            <Passkey
                                passkey={passkey}
                                key={passkey.id}
                                removable={passkeysResult.data.length > 1}
                                removePasskey={removePasskey}
                            />
                        ))}
                    </PasskeysList>
                </QueryLoader>
            </QueryError>
        </>
    );
};
