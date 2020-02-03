export class EmailSettings {
    public address: string;
    public displayName: string;

    constructor(values: Partial<EmailSettings>) {
        Object.assign(this, values);
    }
}