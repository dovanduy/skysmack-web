import { Identifiable } from './identifiable';

export class AvailablePackage extends Identifiable<string> {
    name?: string;
    description?: string;
    category?: string;
    type?: string;
    dependencyTypes?: string[];
    permissions?: string[];

    public get identifier(): string {
        return this.type;
    }
    public set identifier(v: string) {
        this.type = v;
    }

    public constructor(init?: Partial<AvailablePackage>) {
        super();
        Object.assign(this, init);
    }
}
