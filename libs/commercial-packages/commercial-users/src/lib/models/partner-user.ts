export class PartnerUser {
    public id: string;
    public email: string;
    public userName: string;
    public password: string;
    public confirmPassword: string;

    constructor(values?: Partial<PartnerUser>) {
        Object.assign(this, values);
    }
}
