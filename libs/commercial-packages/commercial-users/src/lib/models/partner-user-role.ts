export class PartnerUserRole {
    public userId: string;
    public roleId: string;

    constructor(values?: Partial<PartnerUserRole>) {
        Object.assign(this, values);
    }
}