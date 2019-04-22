import { UserSettings } from './user-settings';
import { PasswordSettings } from './password-settings';
import { LockoutSettings } from './lockout-settings';
import { SignInSettings } from './sign-in-settings';

export class IdentitiesSettings {
    public userSettings: UserSettings;
    public passwordSettings: PasswordSettings;
    public lockoutSettings: LockoutSettings;
    public signInSettings: SignInSettings;
}