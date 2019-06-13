import { FIND, ADD, UPDATE, REMOVE } from '@skysmack/framework';

export class IdentitiesPermissions {
    private static users = 'Users';
    private static roles = 'Roles';

    private static get = 'Get';
    private static set = 'Set';

    public static findUsers = FIND + IdentitiesPermissions.users;
    public static addUsers = ADD + IdentitiesPermissions.users;
    public static updateUsers = UPDATE + IdentitiesPermissions.users;
    public static removeUsers = REMOVE + IdentitiesPermissions.users;

    public static setPassword = 'SetPassword';

    public static findRoles = FIND + IdentitiesPermissions.roles;
    public static addRoles = ADD + IdentitiesPermissions.roles;
    public static updateRoles = UPDATE + IdentitiesPermissions.roles;
    public static removeRoles = REMOVE + IdentitiesPermissions.roles;

    public static findRoleNames = 'FindRoleNames';
    public static findUserIds = 'FindUserIds';
    public static addRole = 'AddRole';
    public static removeRole = 'RemoveRole';

    public static getLockoutSettings = IdentitiesPermissions.get + 'LockoutSettings';
    public static setLockoutSettings = IdentitiesPermissions.set + 'LockoutSettings';

    public static getPasswordSettings = IdentitiesPermissions.get + 'PasswordSettings';
    public static setPasswordSettings = IdentitiesPermissions.set + 'PasswordSettings';

    public static getSignInSettings = IdentitiesPermissions.get + 'SignInSettings';
    public static setSignInSettings = IdentitiesPermissions.set + 'SignInSettings';

    public static getUserSettings = IdentitiesPermissions.get + 'UserSettings';
    public static setUserSettings = IdentitiesPermissions.set + 'UserSettings';
}