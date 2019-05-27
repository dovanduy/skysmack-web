import { FIND, FIND_OWN, ADD, ADD_OWN, UPDATE, UPDATE_OWN, REMOVE, REMOVE_OWN, FIELDS } from '@skysmack/framework';

export class PersonsPermissions {
    private entityName = 'Persons';
    public findPersons = FIND + this.entityName;
    public findOwnPersons = FIND_OWN + this.entityName;
    public addPersons = ADD + this.entityName;
    public addOwnPersons = ADD_OWN + this.entityName;
    public updatePersons = UPDATE + this.entityName;
    public updateOwnPersons = UPDATE_OWN + this.entityName;
    public removePersons = REMOVE + this.entityName;
    public removeOwnPersons = REMOVE_OWN + this.entityName;
    public findPersonsFields = FIND + this.entityName + FIELDS;
    public addPersonsFields = ADD + this.entityName + FIELDS;
    public updatePersonsFields = UPDATE + this.entityName + FIELDS;
    public removePersonsFields = REMOVE + this.entityName + FIELDS;
}