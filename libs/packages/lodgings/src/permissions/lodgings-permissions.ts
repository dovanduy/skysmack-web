import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class LodgingsPermissions {
    private lodgings = 'Rooms';
    private lodgingFields = 'Room' + FIELDS;

    private lodgingTypes = 'Room types';
    private lodgingTypeFields = 'Room type' + FIELDS;

    public findLodgings = FIND + this.lodgings;
    public addLodgings = ADD + this.lodgings;
    public updateLodgings = UPDATE + this.lodgings;
    public removeLodgings = REMOVE + this.lodgings;

    public findLodgingFields = FIND + this.lodgingFields;
    public addLodgingFields = ADD + this.lodgingFields;
    public updateLodgingFields = UPDATE + this.lodgingFields;
    public removeLodgingFields = REMOVE + this.lodgingFields;

    public findLodgingTypes = FIND + this.lodgingTypes;
    public addLodgingTypes = ADD + this.lodgingTypes;
    public updateLodgingTypes = UPDATE + this.lodgingTypes;
    public removeLodgingTypes = REMOVE + this.lodgingTypes;

    public findLodgingTypeFields = FIND + this.lodgingTypeFields;
    public addLodgingTypeFields = ADD + this.lodgingTypeFields;
    public updateLodgingTypeFields = UPDATE + this.lodgingTypeFields;
    public removeLodgingTypeFields = REMOVE + this.lodgingTypeFields;
}