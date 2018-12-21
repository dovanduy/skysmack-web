import { Identifiable } from './identifiable';

export class Package implements Identifiable<string> {
    public get identifier(): string {
        return this.path;
    }
    public set identifier(v: string) {
        this.path = v;
    }

    type?: string;
    name?: string;
    description?: string;
    path?: string;
    dependencies?: string[];

    public constructor(init?: Partial<Package>) {
        Object.assign(this, init);
    }
}
