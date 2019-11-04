import { FIND, ADD, UPDATE, REMOVE } from '@skysmack/framework';

export class AccessPoliciesPermissions {
    private static permissions = 'Permissions';
    private static roles = 'Roles';
    private static rules = 'Rules';

    public static findPermissions = FIND + AccessPoliciesPermissions.permissions;
    public static addPermissions = ADD + AccessPoliciesPermissions.permissions;
    public static updatePermissions = UPDATE + AccessPoliciesPermissions.permissions;
    public static removePermissions = REMOVE + AccessPoliciesPermissions.permissions;

    public static findRoles = FIND + AccessPoliciesPermissions.roles;
    public static addRoles = ADD + AccessPoliciesPermissions.roles;
    public static updateRoles = UPDATE + AccessPoliciesPermissions.roles;
    public static removeRoles = REMOVE + AccessPoliciesPermissions.roles;

    public static findRules = FIND + AccessPoliciesPermissions.rules;
    public static addRules = ADD + AccessPoliciesPermissions.rules;
    public static updateRules = UPDATE + AccessPoliciesPermissions.rules;
    public static removeRules = REMOVE + AccessPoliciesPermissions.rules;
}