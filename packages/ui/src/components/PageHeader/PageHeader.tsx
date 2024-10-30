import Link from 'next/link';
import { GitHub } from '@mui/icons-material';
import { Container } from '@mui/material';

import { Icon } from '../Icon';
import { Words } from '../Words';

export interface PageHeaderProps {
    children?: React.ReactNode;
}

export const PageHeader = ({ children }: PageHeaderProps) => {
    return (
        <Container
            maxWidth='xl'
            sx={theme => ({
                padding: theme.spacing(3, 1.5),
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            })}
            component='header'
        >
            <Words
                variant='h1'
                sx={theme => ({
                    [theme.breakpoints.down('sm')]: {
                        fontSize: theme.typography.h3.fontSize,
                    },
                })}
            >
                {children}
            </Words>
            <Link
                href='https://github.com/cermakjiri/with-webauthn'
                target='_blank'
                title='A repository with full stack WebAuthn API examples.'
            >
                <Icon
                    icon={GitHub}
                    sx={{
                        color: '#000',
                        height: 32,
                        width: 32,
                    }}
                />
            </Link>
        </Container>
    );
};
