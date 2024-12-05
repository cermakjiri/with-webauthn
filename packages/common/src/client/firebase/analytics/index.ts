import { logEvent, type EventParams } from 'firebase/analytics';

import { analytics } from '../config';

type AnalyticEvent =
    // General
    | 'hamburger_menu_open'
    | 'view_github_repo'
    | 'hamburger_default_example'
    | 'hamburger_upgrade_example'
    | 'account_menu_open'
    | 'example_route_change'

    // Default example
    | 'example_default_register_request'
    | 'example_default_register_success'
    | 'example_default_register_failure'
    | 'example_default_login_request'
    | 'example_default_login_success'
    | 'example_default_login_failure'
    | 'example_default_add_passkey_request'
    | 'example_default_add_passkey_success'
    | 'example_default_add_passkey_failure'
    | 'example_default_remove_passkey_request'
    | 'example_default_remove_passkey_success'
    | 'example_default_remove_passkey_failure'

    // Upgrade example
    | 'example_upgrade_register_request'
    | 'example_upgrade_register_success'
    | 'example_upgrade_register_email_verified'
    | 'example_upgrade_register_failure'
    | 'example_upgrade_login_request'
    | 'example_upgrade_login_success'
    | 'example_upgrade_login_failure'
    | 'example_upgrade_login_passkey_request'
    | 'example_upgrade_login_passkey_success'
    | 'example_upgrade_login_passkey_failure'
    | 'example_upgrade_add_passkey_request'
    | 'example_upgrade_add_passkey_success'
    | 'example_upgrade_add_passkey_failure'
    | 'example_upgrade_remove_passkey_request'
    | 'example_upgrade_remove_passkey_success'
    | 'example_upgrade_remove_passkey_failure';

/**
 * Disclaimer:
 * All event tracking is anonymous and no personal data is collected.
 * This is to help us understand how users are interacting with the app and to help us improve the user experience.
 */
export function track(type: AnalyticEvent, params?: EventParams) {
    logEvent(analytics(), type, params);
}
