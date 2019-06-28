import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class LodgingsPermissions {
    private static lodgings = 'Lodgings';
    private static lodgingFields = 'Lodging' + FIELDS;

    private static lodgingTypes = 'LodgingTypes';
    private static lodgingTypeFields = 'LodgingType' + FIELDS;

    public static findLodgings = FIND + LodgingsPermissions.lodgings;
    public static addLodgings = ADD + LodgingsPermissions.lodgings;
    public static updateLodgings = UPDATE + LodgingsPermissions.lodgings;
    public static removeLodgings = REMOVE + LodgingsPermissions.lodgings;

    public static findLodgingFields = FIND + LodgingsPermissions.lodgingFields;
    public static addLodgingFields = ADD + LodgingsPermissions.lodgingFields;
    public static updateLodgingFields = UPDATE + LodgingsPermissions.lodgingFields;
    public static removeLodgingFields = REMOVE + LodgingsPermissions.lodgingFields;

    public static findLodgingTypes = FIND + LodgingsPermissions.lodgingTypes;
    public static addLodgingTypes = ADD + LodgingsPermissions.lodgingTypes;
    public static updateLodgingTypes = UPDATE + LodgingsPermissions.lodgingTypes;
    public static removeLodgingTypes = REMOVE + LodgingsPermissions.lodgingTypes;

    public static findLodgingTypeFields = FIND + LodgingsPermissions.lodgingTypeFields;
    public static addLodgingTypeFields = ADD + LodgingsPermissions.lodgingTypeFields;
    public static updateLodgingTypeFields = UPDATE + LodgingsPermissions.lodgingTypeFields;
    public static removeLodgingTypeFields = REMOVE + LodgingsPermissions.lodgingTypeFields;
}