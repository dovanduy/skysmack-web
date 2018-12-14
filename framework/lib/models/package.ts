export class Package {
    type?: string;
    name?: string;
    description?: string;
    path?: string;
    dependencies?: string[];

    public constructor(init?: Partial<Package>) {
        Object.assign(this, init);
    }
}
