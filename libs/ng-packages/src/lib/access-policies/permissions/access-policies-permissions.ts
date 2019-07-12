import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class AccessPolciesPermissions {
    private static permissions = 'Permissions';

    private static roles = 'Roles';

    private static rules = 'Rules';

    public static findPermissions = FIND + AccessPolciesPermissions.permissions;
    public static addPermissions = ADD + AccessPolciesPermissions.permissions;
    public static updatePermissions = UPDATE + AccessPolciesPermissions.permissions;
    public static removePermissions = REMOVE + AccessPolciesPermissions.permissions;

    public static findRoles = FIND + AccessPolciesPermissions.roles;
    public static addRoles = ADD + AccessPolciesPermissions.roles;
    public static updateRoles = UPDATE + AccessPolciesPermissions.roles;
    public static removeRoles = REMOVE + AccessPolciesPermissions.roles;

    public static findRules = FIND + AccessPolciesPermissions.rules;
    public static addRules = ADD + AccessPolciesPermissions.rules;
    public static updateRules = UPDATE + AccessPolciesPermissions.rules;
    public static removeRules = REMOVE + AccessPolciesPermissions.rules;
}