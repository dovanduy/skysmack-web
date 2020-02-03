import { Record } from "@skysmack/framework";

export class AccessController extends Record<string> {
    public route: string;
    public username: string;
    public password: string;
    public skipVerifySSL: boolean;

    public constructor(init?: Partial<AccessController>) {
        super();
        Object.assign(this, init);
    }
}