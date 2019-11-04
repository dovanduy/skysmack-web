import { FIND, ADD, UPDATE, REMOVE } from '@skysmack/framework';

export class IdentitiesPermissions {
    // Prefixes
    private static users = 'Users';
    private static roles = 'Roles';
    private static applications = 'Applications';
    private static application = 'Application';

    private static get = 'Get';
    private static set = 'Set';

    // Users
    public static findUsers = FIND + IdentitiesPermissions.users;
    public static addUsers = ADD + IdentitiesPermissions.users;
    public static updateUsers = UPDATE + IdentitiesPermissions.users;
    public static removeUsers = REMOVE + IdentitiesPermissions.users;
    public static setPassword = 'SetPassword';

    // Roles
    public static findRoles = FIND + IdentitiesPermissions.roles;
    public static addRoles = ADD + IdentitiesPermissions.roles;
    public static updateRoles = UPDATE + IdentitiesPermissions.roles;
    public static removeRoles = REMOVE + IdentitiesPermissions.roles;

    public static findRoleNames = 'FindRoleNames';
    public static findUserIds = 'FindUserIds';
    public static addRole = 'AddRole';
    public static removeRole = 'RemoveRole';

    // Applications
    public static findApplications = FIND + IdentitiesPermissions.applications;
    public static addApplications = ADD + IdentitiesPermissions.applications;
    public static updateApplications = UPDATE + IdentitiesPermissions.applications;
    public static setClientSecret = 'SetClientSecret';
    public static removeApplications = REMOVE + IdentitiesPermissions.applications;
    public static addApplicationRoles = ADD + IdentitiesPermissions.application + IdentitiesPermissions.roles;
    public static removeApplicationRoles = REMOVE + IdentitiesPermissions.application + IdentitiesPermissions.roles;

    // Settings
    public static getLockoutSettings = IdentitiesPermissions.get + 'LockoutSettings';
    public static setLockoutSettings = IdentitiesPermissions.set + 'LockoutSettings';

    public static getPasswordSettings = IdentitiesPermissions.get + 'PasswordSettings';
    public static setPasswordSettings = IdentitiesPermissions.set + 'PasswordSettings';

    public static getSignInSettings = IdentitiesPermissions.get + 'SignInSettings';
    public static setSignInSettings = IdentitiesPermissions.set + 'SignInSettings';

    public static getUserSettings = IdentitiesPermissions.get + 'UserSettings';
    public static setUserSettings = IdentitiesPermissions.set + 'UserSettings';

}