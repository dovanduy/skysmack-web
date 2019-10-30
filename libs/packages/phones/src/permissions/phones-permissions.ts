import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class PhonesPermissions {
    private static phones = 'Phones';
    public static findPhones = FIND + PhonesPermissions.phones;
    public static addPhones = ADD + PhonesPermissions.phones;
    public static updatePhones = UPDATE + PhonesPermissions.phones;
    public static removePhones = REMOVE + PhonesPermissions.phones;
}