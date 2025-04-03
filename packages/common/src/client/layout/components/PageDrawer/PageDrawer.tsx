import { useState } from 'react';
import Link from 'next/link';
import { Close, Menu } from '@mui/icons-material';
import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, Stack } from '@mui/material';

import { env } from '~client/env';
import { Words } from '~client/ui-kit';

import { DrawerContent } from './PageDrawer.styles';

export const PageDrawer = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <IconButton
                onClick={() => {
                    return setOpen(!open);
                }}
                size='large'
                aria-label='menu'
            >
                <Menu sx={{ color: '#000' }} />
            </IconButton>
            <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
                <DrawerContent role='presentation'>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                        <Words variant='h3' sx={{ py: 3, px: 1.5 }}>
                            WebAuthn Demos
                        </Words>

                        <IconButton onClick={() => setOpen(false)} size='large' aria-label='close'>
                            <Close />
                        </IconButton>
                    </Stack>
                    <Divider />
                    <List>
                        <ListItem>
                            <ListItemButton
                                LinkComponent={Link}
                                href={env.NEXT_PUBLIC_DEFAULT_EXAMPLE_ORIGIN}
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <Words variant='body2'>Authenticate with passkeys</Words>
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton
                                LinkComponent={Link}
                                href={env.NEXT_PUBLIC_UPGRADE_EXAMPLE_ORIGIN}
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <Words variant='body2'>Upgrade to passkeys</Words>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </DrawerContent>
            </Drawer>
        </>
    );
};
