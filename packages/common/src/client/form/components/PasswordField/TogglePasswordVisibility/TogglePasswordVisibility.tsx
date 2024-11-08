import { Icon, IconButton } from '~client/ui-kit';
import { Visibility, VisibilityOff } from '~client/ui-kit/icons';

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
