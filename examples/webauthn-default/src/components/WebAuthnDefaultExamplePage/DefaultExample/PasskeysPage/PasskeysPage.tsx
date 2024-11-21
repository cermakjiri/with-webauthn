import { useDialog } from '@workspace/common/client/dialog/hooks';
import {
    PasskeysHeader,
    PasskeysList,
    PostRemovalDialog,
    type PostRemovalDialogProps,
} from '@workspace/common/client/passkeys/components';

import { useAddPasskey } from './hooks/useAddPasskey';
import { useRemovePasskey } from './hooks/useRemovePasskey';

export const PasskeysPage = () => {
    const addPasskey = useAddPasskey();
    const postRemovalDialog = useDialog<PostRemovalDialogProps['data']>();
    const removePasskey = useRemovePasskey(postRemovalDialog.openDialog);

    return (
        <>
            <PasskeysHeader addPasskey={addPasskey} />
            <PasskeysList removePasskey={removePasskey} />
            <PostRemovalDialog
                open={postRemovalDialog.open}
                onClose={postRemovalDialog.closeDialog}
                data={postRemovalDialog.data}
            />
        </>
    );
};
