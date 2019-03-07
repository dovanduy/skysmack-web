import { UserOptions } from './user-options';
import { PasswordOptions } from './password-options';
import { LockoutOptions } from './lockout-options';
import { SignInOptions } from './sign-in-options';

export class IdentitiesSettings {
    public userOptions: UserOptions;
    public passwordOptions: PasswordOptions;
    public lockoutOptions: LockoutOptions;
    public signInOptions: SignInOptions;
}