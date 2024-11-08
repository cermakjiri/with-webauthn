import { Caption } from '@workspace/common/client/passkeys/components/Passkey/Caption';
import { ProviderProfile } from '@workspace/common/client/passkeys/components/Passkey/ProviderProfile';
import { Box, Button, Dialog, DialogActions, Icon, Stack, Words } from '@workspace/common/client/ui-kit';
import { Warning } from '@workspace/common/client/ui-kit/icons';
import type { Passkey } from '@workspace/common/types';

import { PasskeyDetails } from './PostRemovalDialog.styles';

export interface PostRemovalDialogProps {
    open: boolean;
    onClose: () => void;
    data: {
        provider: Passkey['provider'];
        rpId: Passkey['rpId'];
        username: string;
    } | null;
}

export const PostRemovalDialog = ({ open, onClose, data }: PostRemovalDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth='md'>
            {data && (
                <Box sx={{ pt: 4, pb: 3, pl: 4, pr: 4 }}>
                    <Stack direction='row' alignItems='center' mb={3} gap={1}>
                        <Icon icon={Warning} sx={theme => ({ color: theme.palette.primary.main })} />
                        <Words variant='h2'>The passkey has been successfully removed</Words>
                    </Stack>
                    <Words variant='body2' sx={{ lineHeight: 1.5 }}>
                        {`Don't forget to remove the other part in your provider too:`}
                    </Words>
                    <Box sx={{ ml: 3, mt: 2.5, mb: 3 }}>
                        <ProviderProfile name={data.provider?.name!} icon={data.provider?.icon_light} />
                        <PasskeyDetails sx={{ mt: 1 }}>
                            <Caption caption='Username:' />
                            <Words variant='caption'>{data.username}</Words>
                            <Caption caption='Website:' />
                            <Words variant='caption'>{data.rpId}</Words>
                        </PasskeyDetails>
                    </Box>
                    <DialogActions>
                        <Button variant='contained' color='primary' onClick={onClose}>
                            Ok, I removed it
                        </Button>
                    </DialogActions>
                </Box>
            )}
        </Dialog>
    );
};
