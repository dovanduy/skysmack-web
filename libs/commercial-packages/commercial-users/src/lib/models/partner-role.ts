export class PartnerRole {
    public id: string;
    public name: string;
    public normalizedName: string;
    public concurrencyStamp: string;

    constructor(values?: Partial<PartnerRole>) {
        Object.assign(this, values);
    }
}
