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

    constructor(values?: Url) {
        if (values) {
            Object.assign(this, values);
        } else {
            const host = window.location.host;
            const parts: any = this.splitHostname();

            this.origin = window.location.origin;
            this.host = host;
            this.noPortHost = this.stripPortNumber(host);
            this.httpProtocol = this.extractHttpProtocol(host);
            this.subdomain = parts.subdomain;
            this.domain = parts.domain;
            this.path = window.location.pathname;
            this.port = Number(window.location.port);
            this.protocol = window.location.protocol;
        }
    }

    private splitHostname(): {} {
        const result: any = {};
        const regexParse = new RegExp('([a-z\-0-9]{2,63})\.([a-z\.]{2,5})$');
        const urlParts = regexParse.exec(window.location.hostname);
        result.domain = urlParts[1];
        result.type = urlParts[2];
        result.subdomain = window.location.hostname.replace(result.domain + '.' + result.type, '').slice(0, -1);
        return result;
    }

    private stripPortNumber(host: string): string {
        return host.split(':')[0];
    }

    private extractHttpProtocol(host: string): string {
        return host.includes('https') ? 'https://' : 'http://';
    }
}
