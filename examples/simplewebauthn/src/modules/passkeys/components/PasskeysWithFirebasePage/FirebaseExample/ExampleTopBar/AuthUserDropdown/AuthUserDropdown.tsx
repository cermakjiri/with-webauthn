import { useState } from 'react';

import { Box, Divider, IconButton, Menu, MenuItem } from '@workspace/ui';
import { AccountCircle } from '@workspace/ui/icons';

import { useExampleAuthSession } from '../../ExampleAuth';
import { useLogout } from './hooks/useLogout';

export const AuthUserDropdown = () => {
    const { session } = useExampleAuthSession();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [open, setOpen] = useState(false);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const logout = useLogout(handleClose);

    if (session.state !== 'authenticated') {
        return null;
    }

    const { email } = session.authUser;

    return (
        <>
            <Box sx={{ ml: 'auto' }}>
                <IconButton
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    aria-controls={open ? 'auth-user-menu' : undefined}
                    onClick={handleClick}
                >
                    <AccountCircle />
                </IconButton>
            </Box>

            <Menu id='auth-user-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
                {email && <MenuItem>{email}</MenuItem>}
                <Divider />
                <MenuItem onClick={() => logout.mutate()}>Logout</MenuItem>
            </Menu>
        </>
    );
};
