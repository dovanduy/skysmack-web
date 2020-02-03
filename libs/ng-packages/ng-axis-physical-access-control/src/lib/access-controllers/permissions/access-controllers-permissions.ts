import { FIND, ADD, UPDATE, REMOVE } from '@skysmack/framework';

export class AccessControllersPermissions {
    private static AccessControllers = 'AccessControllers';

    public static findAccessControllers = FIND + AccessControllersPermissions.AccessControllers;
    public static addAccessControllers = ADD + AccessControllersPermissions.AccessControllers;
    public static updateAccessControllers = UPDATE + AccessControllersPermissions.AccessControllers;
    public static removeAccessControllers = REMOVE + AccessControllersPermissions.AccessControllers;
}