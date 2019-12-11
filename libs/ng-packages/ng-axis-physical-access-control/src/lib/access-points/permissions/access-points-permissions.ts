import { FIND, ADD, UPDATE, REMOVE } from '@skysmack/framework';

export class AccessPointsPermissions {
    private static products = 'AccessPoints';

    public static findAccessPoints = FIND + AccessPointsPermissions.products;
    public static addAccessPoints = ADD + AccessPointsPermissions.products;
    public static updateAccessPoints = UPDATE + AccessPointsPermissions.products;
    public static removeAccessPoints = REMOVE + AccessPointsPermissions.products;
}