import { Container } from '@mui/material';

import { Words } from '../Words';

export interface PageHeaderProps {
    children?: React.ReactNode;
}

export const PageHeader = ({ children }: PageHeaderProps) => {
    return (
        <Container
            maxWidth='xl'
            sx={theme => ({
                padding: theme.spacing(3, 0),
            })}
            component='header'
        >
            <Words variant='h1'>{children}</Words>
        </Container>
    );
};
