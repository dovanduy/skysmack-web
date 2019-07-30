import { Record } from "@skysmack/framework";

export class Application extends Record<number> {
    public clientId: string;
    public concurrencyToken: string;
    public consentType: string;
    public displayName: string;
    public permissions: string;
    public postLogoutRedirectUris: string;
    public properties: string;
    public redirectUris: string;
    public type: string;

    public constructor(init?: Partial<Application>) {
        super();
        Object.assign(this, init);
    }
}