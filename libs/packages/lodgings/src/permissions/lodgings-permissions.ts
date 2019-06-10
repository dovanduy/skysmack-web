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

    public findLodgingsFields = FIND + this.lodgingFields;
    public addLodgingsFields = ADD + this.lodgingFields;
    public updateLodgingsFields = UPDATE + this.lodgingFields;
    public removeLodgingsFields = REMOVE + this.lodgingFields;

    public findLodgingTypes = FIND + this.lodgingTypes;
    public addLodgingTypes = ADD + this.lodgingTypes;
    public updateLodgingTypes = UPDATE + this.lodgingTypes;
    public removeLodgingTypes = REMOVE + this.lodgingTypes;

    public findLodgingTypesFields = FIND + this.lodgingTypeFields;
    public addLodgingTypesFields = ADD + this.lodgingTypeFields;
    public updateLodgingTypesFields = UPDATE + this.lodgingTypeFields;
    public removeLodgingTypesFields = REMOVE + this.lodgingTypeFields;
}