import { HttpMethod, Record } from "@skysmack/framework";
import { HttpHeader } from './http-header';

export class Webhook extends Record<number> {
    public url: string;
    public httpMethod: HttpMethod;
    public customHeaders: HttpHeader;
    public packagePath: string;
    public source: string;
    public eventType: string;

    public constructor(init?: Partial<Webhook>) {
        super();
        Object.assign(this, init);
    }
}