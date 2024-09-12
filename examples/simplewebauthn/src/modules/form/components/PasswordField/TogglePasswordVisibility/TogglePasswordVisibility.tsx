import { IconButton } from '@mui/material';

import { Icon } from '@workspace/ui';
import { Visibility, VisibilityOff } from '@workspace/ui/icons';

export type PasswordType = 'text' | 'password';

export interface TogglePasswordVisibilityProps {
    onToggle: (type: (currentType: PasswordType) => PasswordType) => void;
    type: PasswordType;
}

export const TogglePasswordVisibility = ({ onToggle, type }: TogglePasswordVisibilityProps) => {
    return (
        <IconButton
            aria-label='toggle password visibility'
            onClick={() => onToggle(currentType => (currentType === 'password' ? 'text' : 'password'))}
            edge='end'
        >
            <Icon icon={type === 'password' ? Visibility : VisibilityOff} />
        </IconButton>
    );
};
