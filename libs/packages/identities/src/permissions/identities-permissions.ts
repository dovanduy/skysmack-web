import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class IdentitiesPermissions {
    private users = 'Users';
    private roles = 'Roles';

    private get = 'Get';
    private set = 'Set';

    public findUsers = FIND + this.users;
    public addUsers = ADD + this.users;
    public updateUsers = UPDATE + this.users;
    public removeUsers = REMOVE + this.users;

    public setPassword = 'SetPassword';

    public findRoles = FIND + this.roles;
    public addRoles = ADD + this.roles;
    public updateRoles = UPDATE + this.roles;
    public removeRoles = REMOVE + this.roles;

    public findRoleNames = 'FindRoleNames';
    public findUserIds = 'FindUserIds';
    public addRole = 'AddRole';
    public removeRole = 'RemoveRole';

    public getLockoutSettings = this.get + 'LockoutSettings';
    public setLockoutSettings = this.set + 'LockoutSettings';

    public getPasswordSettings = this.get + 'PasswordSettings';
    public setPasswordSettings = this.set + 'PasswordSettings';

    public getSignInSettings = this.get + 'SignInSettings';
    public setSignInSettings = this.set + 'SignInSettings';

    public getUserSettings = this.get + 'UserSettings';
    public setUserSettings = this.set + 'UserSettings';
}