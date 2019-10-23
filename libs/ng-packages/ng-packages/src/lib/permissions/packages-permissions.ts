import { FIND, ADD, UPDATE, REMOVE, RENAME } from '@skysmack/framework';

export class PackagesPermissions {
    private static packages = 'Packages';

    public static findPackages = FIND + PackagesPermissions.packages;
    public static addPackages = ADD + PackagesPermissions.packages;
    public static renamePackages = RENAME + PackagesPermissions.packages;
    public static updatePackages = UPDATE + PackagesPermissions.packages;
    public static removePackages = REMOVE + PackagesPermissions.packages;
   
}