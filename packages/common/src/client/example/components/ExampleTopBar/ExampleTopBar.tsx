import type { ReactNode } from 'react';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';

import { track } from '~client/firebase/analytics';
import { IconButton, Words } from '~client/ui-kit';

import { useExampleAuthSession } from '../ExampleAuth';
import { AuthUserDropdown } from './AuthUserDropdown';
import { Topbar } from './ExampleTopBar.styles';

export interface ExampleTopBarProps {
    onToggleExpand: (expanded: boolean) => void;
    expanded: boolean;
    title: ReactNode;
    onLogout: () => void;
}

export const ExampleTopBar = ({ onToggleExpand, expanded, title, onLogout }: ExampleTopBarProps) => {
    const { session } = useExampleAuthSession();

    return (
        <Topbar>
            <div>
                <IconButton
                    onClick={() => {
                        onToggleExpand(!expanded);
                        track('account_menu_open');
                    }}
                    sx={{ mr: 'auto' }}
                >
                    {expanded ? <FullscreenExit /> : <Fullscreen />}
                </IconButton>
            </div>

            <Words
                variant='h4'
                sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >
                {title}
            </Words>

            {session.state === 'authenticated' ? <AuthUserDropdown onLogout={onLogout} /> : <IconButton />}
        </Topbar>
    );
};
