export class Owner {
    public email: string;
    public password: string;

    constructor(values?: Partial<Owner>) {
        Object.assign(this, values);
    }
}