export class Package {
    public type?: string;
    public name?: string;
    public description?: string;
    public path?: string;
    public dependencies?: string[];
    public access?: boolean;

    public constructor(init?: Partial<Package>) {
        Object.assign(this, init);
    }
}
