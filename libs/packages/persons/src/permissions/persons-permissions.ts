import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class PersonsPermissions {
    private static ownPersons = 'OwnPersons';
    private static ownPersonFields = 'OwnPerson' + FIELDS;
    
    public static findOwnPersons = FIND + PersonsPermissions.ownPersons;
    public static addOwnPersons = ADD + PersonsPermissions.ownPersons;
    public static updateOwnPersons = UPDATE + PersonsPermissions.ownPersons;
    public static removeOwnPersons = REMOVE + PersonsPermissions.ownPersons;

    public static findOwnPersonsFields = FIND + PersonsPermissions.ownPersonFields;
    public static addOwnPersonsFields = ADD + PersonsPermissions.ownPersonFields;
    public static updateOwnPersonsFields = UPDATE + PersonsPermissions.ownPersonFields;
    public static removeOwnPersonsFields = REMOVE + PersonsPermissions.ownPersonFields;
}