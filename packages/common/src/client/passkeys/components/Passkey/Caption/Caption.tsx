import type { ReactNode } from 'react';

import { InfoTooltip, Words } from '~client/ui-kit';

import { CaptionWrapper } from './Caption.styles';

export interface CaptionProps {
    caption: ReactNode;
    tooltip?: ReactNode;
}

export const Caption = ({ caption, tooltip }: CaptionProps) => {
    return (
        <CaptionWrapper>
            <Words variant='caption' sx={{ fontWeight: 500 }}>
                {caption}
            </Words>
            {tooltip && <InfoTooltip title={tooltip} />}
        </CaptionWrapper>
    );
};
