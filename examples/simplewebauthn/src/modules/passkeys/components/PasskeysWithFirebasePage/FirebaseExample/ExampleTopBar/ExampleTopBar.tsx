import { IconButton, Words } from '@workspace/ui';
import { Fullscreen, FullscreenExit } from '@workspace/ui/icons';

import { useExampleAuthSession } from '../ExampleAuth';
import { AuthUserDropdown } from './AuthUserDropdown';
import { Topbar } from './ExampleTopBar.styles';
import { useExampleRouteTitle } from './hooks/useExampleRouteTitle';

export interface ExampleTopBarProps {
    onToggleExpand: (expanded: boolean) => void;
    expanded: boolean;
}

export const ExampleTopBar = ({ onToggleExpand, expanded }: ExampleTopBarProps) => {
    const { session } = useExampleAuthSession();
    const routeTitle = useExampleRouteTitle();

    return (
        <Topbar>
            <div>
                <IconButton onClick={() => onToggleExpand(!expanded)} sx={{ mr: 'auto' }}>
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
                {routeTitle}
            </Words>

            {session.state === 'authenticated' ? <AuthUserDropdown /> : <IconButton />}
        </Topbar>
    );
};
