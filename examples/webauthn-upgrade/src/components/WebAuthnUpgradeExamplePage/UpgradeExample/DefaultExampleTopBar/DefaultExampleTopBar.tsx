import { ExampleTopBar, type ExampleTopBarProps } from '@workspace/common/client/example/components';

import { useExampleRouter } from '../DefaultExampleRouter';
import { useExampleRouteTitle } from './hooks/useExampleRouteTitle';

export interface DefaultExampleTopBarProps extends Pick<ExampleTopBarProps, 'expanded' | 'onToggleExpand'> {}

export const DefaultExampleTopBar = ({ expanded, onToggleExpand }: DefaultExampleTopBarProps) => {
    const title = useExampleRouteTitle();
    const { redirect } = useExampleRouter();

    return (
        <ExampleTopBar
            expanded={expanded}
            onToggleExpand={onToggleExpand}
            title={title}
            onLogout={() => {
                redirect('/login');
            }}
        />
    );
};
