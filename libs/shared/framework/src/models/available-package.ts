
export class AvailablePackage {
    name?: string;
    description?: string;
    category?: string;
    type?: string;
    dependencyTypes?: string[];
    permissions?: string[];

    public constructor(init?: Partial<AvailablePackage>) {
        Object.assign(this, init);
    }
}
