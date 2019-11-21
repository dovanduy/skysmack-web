import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class PassCodesPermissions {
    private static passCodes = 'PassCodes';
    private static passCodeFields = 'PassCode' + FIELDS;

    public static findPassCodes = FIND + PassCodesPermissions.passCodes;
    public static addPassCodes = ADD + PassCodesPermissions.passCodes;
    public static updatePassCodes = UPDATE + PassCodesPermissions.passCodes;
    public static removePassCodes = REMOVE + PassCodesPermissions.passCodes;

    public static findPassCodesFields = FIND + PassCodesPermissions.passCodeFields;
    public static addPassCodesFields = ADD + PassCodesPermissions.passCodeFields;
    public static updatePassCodesFields = UPDATE + PassCodesPermissions.passCodeFields;
    public static removePassCodesFields = REMOVE + PassCodesPermissions.passCodeFields;
}