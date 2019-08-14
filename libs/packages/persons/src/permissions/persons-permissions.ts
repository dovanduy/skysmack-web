import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class PersonsPermissions {
    private static persons = 'Persons';
    private static personFields = 'Person' + FIELDS;
    public static findPersons = FIND + PersonsPermissions.persons;
    public static addPersons = ADD + PersonsPermissions.persons;
    public static updatePersons = UPDATE + PersonsPermissions.persons;
    public static removePersons = REMOVE + PersonsPermissions.persons;

    public static findPersonsFields = FIND + PersonsPermissions.personFields;
    public static addPersonsFields = ADD + PersonsPermissions.personFields;
    public static updatePersonsFields = UPDATE + PersonsPermissions.personFields;
    public static removePersonsFields = REMOVE + PersonsPermissions.personFields;
}