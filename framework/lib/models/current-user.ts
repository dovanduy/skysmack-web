export class CurrentUser {
    public resource: string;
    public token_type: string;
    public access_token: string;
    public expires_in: number;
    public loginTime: Date;
    public email: string;

    constructor(values: CurrentUser) {
        Object.assign(this, values);
    }
}
