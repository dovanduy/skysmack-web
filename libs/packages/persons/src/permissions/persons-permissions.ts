import { FIND, ADD, UPDATE, REMOVE, FIELDS } from '@skysmack/framework';

export class PersonsPermissions {
    private persons = 'Persons';
    private personFields = 'Person' + FIELDS;
    public findPersons = FIND + this.persons;
    public addPersons = ADD + this.persons;
    public updatePersons = UPDATE + this.persons;
    public removePersons = REMOVE + this.persons;
    public findPersonsFields = FIND + this.personFields;
    public addPersonsFields = ADD + this.personFields;
    public updatePersonsFields = UPDATE + this.personFields;
    public removePersonsFields = REMOVE + this.personFields;
}