export class PartnerUserRole {
    public userId: string;
    public roleName: string;

    constructor(values?: Partial<PartnerUserRole>) {
        Object.assign(this, values);
    }
}