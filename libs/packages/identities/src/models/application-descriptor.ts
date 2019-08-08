export class ApplicationDescriptor {
    public clientId: string;
    public clientSecret: string;
    public consentType: string;
    public displayName: string;
    public type: string;
    public permissions: string[];

    public constructor(init?: Partial<ApplicationDescriptor>) {
        Object.assign(this, init);
    }
}