export class SmtpClientSettings {
    public host: string;
    public port: number;
    public username: string;
    public password: string;
    public enableSsl: boolean;

    constructor(values: Partial<SmtpClientSettings>) {
        Object.assign(this, values);
    }
}
