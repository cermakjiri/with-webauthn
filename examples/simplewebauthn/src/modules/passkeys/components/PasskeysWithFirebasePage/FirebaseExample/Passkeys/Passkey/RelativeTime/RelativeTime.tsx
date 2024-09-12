import type { Timestamp } from 'firebase/firestore';
import { FormattedRelativeTime } from 'react-intl';

import { Words } from '@workspace/ui';

export interface RelativeTimeProps {
    value: Timestamp;
}

export const RelativeTime = ({ value }: RelativeTimeProps) => {
    const ellapsedTime = (value.toMillis() - Date.now()) / 1000;

    return (
        <Words variant='caption'>
            <FormattedRelativeTime
                value={ellapsedTime}
                numeric='auto'
                updateIntervalInSeconds={ellapsedTime < 60 ? 1 : 60}
            />
        </Words>
    );
};
