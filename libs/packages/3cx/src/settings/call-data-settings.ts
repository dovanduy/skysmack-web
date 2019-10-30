export class CallDataSettings {
    public outputFields: string[];
    public currencyCode: string;
    constructor(values: Partial<CallDataSettings>) {
        Object.assign(this, values);
    }
}