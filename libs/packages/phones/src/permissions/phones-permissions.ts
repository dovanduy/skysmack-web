import { FIND, ADD, UPDATE, REMOVE } from '@skysmack/framework';

export class PhonesPermissions {
    private static phones = 'Phones';
    public static findPhones = FIND + PhonesPermissions.phones;
    public static addPhones = ADD + PhonesPermissions.phones;
    public static updatePhones = UPDATE + PhonesPermissions.phones;
    public static removePhones = REMOVE + PhonesPermissions.phones;

    private static logs = 'Logs';
    public static findLogs = FIND + PhonesPermissions.logs;
    public static addLogs = ADD + PhonesPermissions.logs;
    public static updateLogs = UPDATE + PhonesPermissions.logs;
    public static removeLogs = REMOVE + PhonesPermissions.logs;

    private static phoneNumbers = 'PhoneNumbers';
    public static findPhoneNumbers = FIND + PhonesPermissions.phoneNumbers;
    public static addPhoneNumbers = ADD + PhonesPermissions.phoneNumbers;
    public static updatePhoneNumbers = UPDATE + PhonesPermissions.phoneNumbers;
    public static removePhoneNumbers = REMOVE + PhonesPermissions.phoneNumbers;
}