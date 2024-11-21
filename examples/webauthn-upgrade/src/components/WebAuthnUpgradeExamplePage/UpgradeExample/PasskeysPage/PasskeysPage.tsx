import { useDialog } from '@workspace/common/client/dialog/hooks';
import { useAuthTokenClaims } from '@workspace/common/client/example/components';
import {
    PasskeysHeader,
    PasskeysList,
    PostRemovalDialog,
    type PostRemovalDialogProps,
} from '@workspace/common/client/passkeys/components';
import { Words } from '@workspace/common/client/ui-kit';

import { tokenClaims } from '~server/constans/tokenClaims';

import { useAddPasskey } from './hooks/useAddPasskey';
import { useRemovePasskey } from './hooks/useRemovePasskey';

export const PasskeysPage = () => {
    const addPasskey = useAddPasskey();
    const postRemovalDialog = useDialog<PostRemovalDialogProps['data']>();
    const removePasskey = useRemovePasskey(postRemovalDialog.openDialog);
    const claims = useAuthTokenClaims();

    return (
        <>
            <PasskeysHeader addPasskey={addPasskey} />
            {claims?.[tokenClaims.MFA_ENABLED] ? (
                <PasskeysList removePasskey={removePasskey} isPasskeyRemovable={() => true} />
            ) : (
                <Words
                    component='p'
                    variant='body2'
                    sx={theme => ({
                        mt: 4,
                        textAlign: 'center',
                        color: theme.palette.text.secondary,
                    })}
                >
                    Enable multi-factor authentication by adding a passkey.
                </Words>
            )}
            <PostRemovalDialog
                open={postRemovalDialog.open}
                onClose={postRemovalDialog.closeDialog}
                data={postRemovalDialog.data}
            />
        </>
    );
};
