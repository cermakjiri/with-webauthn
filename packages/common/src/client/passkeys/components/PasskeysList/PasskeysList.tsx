import { QueryEmpty, QueryError, QueryLoader } from '~client/api/components';

import { Passkey, type PasskeyProps } from '../Passkey/Passkey';
import { useFetchPasskeys } from './hooks/useFetchPasskeys';
import { List } from './PasskeysList.styles';

export interface PasskeysListProps {
    removePasskey: PasskeyProps['removePasskey'];
    isPasskeyRemovable?: (index: number) => boolean;
}

export const PasskeysList = ({ removePasskey, isPasskeyRemovable = index => index > 0 }: PasskeysListProps) => {
    const passkeysResult = useFetchPasskeys();

    return (
        <QueryLoader result={passkeysResult}>
            <QueryEmpty result={passkeysResult} message='No passkeys have been added yet.'>
                <QueryError
                    result={passkeysResult}
                    message='Loading your passkeys have failed. Please try it again later.'
                >
                    <List>
                        {passkeysResult.data.map((passkey, index) => (
                            <Passkey
                                passkey={passkey}
                                key={passkey.id}
                                removable={isPasskeyRemovable(index)}
                                removePasskey={removePasskey}
                            />
                        ))}
                    </List>
                </QueryError>
            </QueryEmpty>
        </QueryLoader>
    );
};
