import { UserOptions } from './user-options';
import { PasswordOptions } from './password-options';
import { LockoutOptions } from './lockout-options';
import { SignInOptions } from './sign-in-options';

export class IdentitiesSettings {
    public userOptions: UserOptions = new UserOptions({});
    public passwordOptions: PasswordOptions = new PasswordOptions({});
    public lockoutOptions: LockoutOptions = new LockoutOptions({});
    public signInOptions: SignInOptions = new SignInOptions({});
}