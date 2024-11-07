import {
    backdropClasses,
    FormControl as FormControlMUI,
    menuClasses,
    MenuItem as MenuItemMui,
    Select as SelectMUI,
    styled,
} from '@mui/material';

const SELECT_INPUT_HEIGHT = 34;

export const FormControl = styled(FormControlMUI)(() => ({
    position: 'relative',
    minWidth: 130,
}));

export const StyledSelect = styled(SelectMUI)(({ theme }) => ({
    height: SELECT_INPUT_HEIGHT,
    minHeight: 'unset',
    padding: 'unset',

    [`& .${backdropClasses.root}`]: {
        visibility: 'hidden',
    },
    [`& .${menuClasses.root}`]: {
        pointerEvents: 'none',
    },
    [`& .${menuClasses.paper}`]: {
        pointerEvents: 'auto',
    },
})) as unknown as typeof SelectMUI;

export const MenuItem = styled(MenuItemMui)(({ theme }) => ({}));
