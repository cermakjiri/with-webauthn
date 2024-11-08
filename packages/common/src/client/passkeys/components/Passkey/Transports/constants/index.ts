import type { AuthenticatorTransportFuture } from '@simplewebauthn/types';

import { Bluetooth, Cable, Fingerprint, Nfc, QrCode, SdStorage, type SvgIconComponent } from '~client/ui-kit/icons';

export const transportIconsMap = {
    ble: {
        icon: Bluetooth,
        name: 'Bluetooth Low Energy (BLE)',
        description:
            'The respective authenticator can be contacted by BLE designed for short-range data exchange. It plays a pivotal role in confirming the physical proximity of devices during the authentication process.',
    },
    hybrid: {
        icon: QrCode,
        name: 'Hybrid',
        description:
            'The respective authenticator can be contacted using a combination of (often separate) data-transport and proximity mechanisms. This supports, for example, authentication on a desktop computer using a smartphone.',
    },
    internal: {
        icon: Fingerprint,
        name: 'Internal',
        description:
            'The respective authenticator is contacted using a client device-specific transport (a platform authenticator), commonly biometric sensors provided by Touch ID / Face ID, Windows Hello, etc.',
    },
    nfc: {
        icon: Nfc,
        name: 'NFC',
        description: 'The respective authenticator can be contacted by NFC.',
    },
    'smart-card': {
        icon: SdStorage,
        name: 'Smart Card',
        description: 'The respective authenticator can be contacted over ISO/IEC 7816 smart card with contacts.',
    },
    usb: {
        icon: Cable,
        name: 'USB',
        description: 'The respective authenticator can be contacted over removable USB (e.g. Yubikey).',
    },
    cable: {
        icon: Cable,
        name: 'Cable',
        description: 'TBD',
    },
} as const satisfies Record<
    AuthenticatorTransportFuture,
    {
        icon: SvgIconComponent;
        description: string;
        name: string;
    }
>;

export const transportTypes = new Set<AuthenticatorTransportFuture>(
    Object.keys(transportIconsMap) as AuthenticatorTransportFuture[],
);
