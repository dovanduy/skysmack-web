export class Database {
    public databaseName: string;
    public canDeleteDatabase: string;

    constructor(values?: Partial<Database>) {
        Object.assign(this, values);
    }
}
