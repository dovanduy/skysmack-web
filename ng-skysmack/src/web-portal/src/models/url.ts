export class Url {
    public origin: string;
    public host: string;
    public noPortHost: string;
    public httpProtocol: string;
    public subdomain: string;
    public domain: string;
    public path: string;
    public port: number;
    public protocol: string;

    constructor(values: Url) {
        Object.assign(this, values);
    }
}
