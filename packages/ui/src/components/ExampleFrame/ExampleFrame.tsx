import type { ReactNode } from 'react';

import { Container, Frame } from './ExampleFrame.styles';

export interface ExampleFrameProps {
    children: ReactNode;
    expanded?: boolean;
}

export const ExampleFrame = ({ children, expanded = false }: ExampleFrameProps) => {
    return (
        <Container>
            <Frame expanded={expanded}>{children}</Frame>
        </Container>
    );
};
