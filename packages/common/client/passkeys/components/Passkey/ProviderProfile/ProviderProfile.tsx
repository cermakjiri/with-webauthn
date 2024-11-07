import { Box, Words } from '~client/ui-kit';

export interface ProviderProfileProps {
    icon?: string;
    name: string;
}

export const ProviderProfile = ({ name, icon }: ProviderProfileProps) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {icon && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={icon} alt='Authenticator provider' height={24} width={24} />
            )}
            <Words variant='caption' mt={0.5}>
                {name}
            </Words>
        </Box>
    );
};
