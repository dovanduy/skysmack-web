import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class DoorwaysPermissions {
    private static doorways = 'Doorways';
    private static doorwayFields = 'Doorway' + FIELDS;

    public static findDoorways = FIND + DoorwaysPermissions.doorways;
    public static addDoorways = ADD + DoorwaysPermissions.doorways;
    public static updateDoorways = UPDATE + DoorwaysPermissions.doorways;
    public static removeDoorways = REMOVE + DoorwaysPermissions.doorways;

    public static findDoorwaysFields = FIND + DoorwaysPermissions.doorwayFields;
    public static addDoorwaysFields = ADD + DoorwaysPermissions.doorwayFields;
    public static updateDoorwaysFields = UPDATE + DoorwaysPermissions.doorwayFields;
    public static removeDoorwaysFields = REMOVE + DoorwaysPermissions.doorwayFields;
}