import { Button, Card, CardContent } from '@workspace/ui';
import { Delete } from '@workspace/ui/icons';

import type { Passkey as TPasskey } from '~server/types';

import type { useRemovePasskey } from '../hooks/useRemovePasskey';
import { DetailsGrid, DetailsRows, StyledDivider } from '../Passkeys.styles';
import { BackedUp } from './BackedUp';
import { Caption } from './Caption';
import { Counter } from './Counter';
import { DeviceType } from './DeviceType';
import { PasskeyID } from './PasskeyID';
import { Provider } from './Provider';
import { PublicKey } from './PublicKey';
import { RelativeTime } from './RelativeTime';
import { RelayingPartyId } from './RelayingPartyId';
import { Transports } from './Transports';

export interface PasskeyProps {
    passkey: TPasskey;
    removable: boolean;
    removePasskey: ReturnType<typeof useRemovePasskey>;
}

export const Passkey = ({ passkey, removable, removePasskey }: PasskeyProps) => {
    return (
        <Card
            key={passkey.id}
            // @ts-expect-error
            component='article'
        >
            <CardContent>
                <PasskeyID value={passkey.credentialId} sx={{ mb: 2.5 }} />

                <DetailsRows>
                    {passkey.provider && <Provider name={passkey.provider.name} icon={passkey.provider.icon_light} />}
                    <Transports transports={passkey.transports} />
                    <RelayingPartyId value={passkey.rpId} />
                </DetailsRows>

                <StyledDivider />

                <DetailsGrid>
                    <DeviceType value={passkey.credentialDeviceType} />
                    <BackedUp value={passkey.credentialBackedUp} />
                    <PublicKey value={passkey.credentialPublicKey} />
                </DetailsGrid>

                <StyledDivider />

                <DetailsGrid>
                    <Caption caption='Last used:' />
                    <div>
                        <RelativeTime value={passkey.lastUsedAt} />
                        <Counter value={passkey.credentialCounter} />
                    </div>

                    <Caption caption='Created:' />
                    <RelativeTime value={passkey.createdAt} />
                </DetailsGrid>

                {removable && (
                    <>
                        <StyledDivider />

                        <Button
                            variant='outlined'
                            color='error'
                            size='small'
                            fullWidth
                            sx={{
                                pt: 0.5,
                                pb: 0.5,
                                height: 'auto',
                            }}
                            loading={removePasskey.isPending}
                            onClick={() => {
                                removePasskey.mutate(passkey.id);
                            }}
                            startIcon={<Delete />}
                        >
                            Remove
                        </Button>
                    </>
                )}
            </CardContent>
        </Card>
    );
};
