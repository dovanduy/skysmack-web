export class PartnerUser {
    public id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public confirmPassword: string;

    constructor(values?: Partial<PartnerUser>) {
        Object.assign(this, values);
    }
}
