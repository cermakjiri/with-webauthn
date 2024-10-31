import { Button, Words } from '@workspace/ui';
import { Fingerprint } from '@workspace/ui/icons';

import { useDialog } from '~hooks';
import { QueryError, QueryLoader } from '~modules/api/components';

import { useAddPasskey } from './hooks/useAddPasskey';
import { useFetchPasskeys } from './hooks/useFetchPasskeys';
import { useRemovePasskey } from './hooks/useRemovePasskey';
import { Passkey } from './Passkey';
import { PasskeysHeader, PasskeysList } from './Passkeys.styles';
import { PostRemovalDialog, type PostRemovalDialogProps } from './PostRemovalDialog';

export const Passkeys = () => {
    const passkeysResult = useFetchPasskeys();
    const addPasskey = useAddPasskey();
    const postRemovalDialog = useDialog<PostRemovalDialogProps['data']>();
    const removePasskey = useRemovePasskey(postRemovalDialog.openDialog);

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
            <PostRemovalDialog
                open={postRemovalDialog.open}
                onClose={postRemovalDialog.closeDialog}
                data={postRemovalDialog.data}
            />
        </>
    );
};
