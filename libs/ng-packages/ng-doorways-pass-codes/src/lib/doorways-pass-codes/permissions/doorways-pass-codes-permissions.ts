import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class DoorwaysPassCodesPermissions {
    private static doorwaysPassCodes = 'DoorwaysPassCodes';
    private static doorwayFields = 'Doorway' + FIELDS;

    public static findDoorwaysPassCodes = FIND + DoorwaysPassCodesPermissions.doorwaysPassCodes;
    public static addDoorwaysPassCodes = ADD + DoorwaysPassCodesPermissions.doorwaysPassCodes;
    public static updateDoorwaysPassCodes = UPDATE + DoorwaysPassCodesPermissions.doorwaysPassCodes;
    public static removeDoorwaysPassCodes = REMOVE + DoorwaysPassCodesPermissions.doorwaysPassCodes;

    public static findDoorwaysPassCodesFields = FIND + DoorwaysPassCodesPermissions.doorwayFields;
    public static addDoorwaysPassCodesFields = ADD + DoorwaysPassCodesPermissions.doorwayFields;
    public static updateDoorwaysPassCodesFields = UPDATE + DoorwaysPassCodesPermissions.doorwayFields;
    public static removeDoorwaysPassCodesFields = REMOVE + DoorwaysPassCodesPermissions.doorwayFields;
}