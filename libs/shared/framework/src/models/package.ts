import { Record } from './record';

export class Package extends Record<string> {
    public type?: string;
    public name?: string;
    public description?: string;
    public path?: string;
    public dependencies?: string[];
    public access?: boolean;

    public constructor(init?: Partial<Package>) {
        super(init);
        Object.assign(this, init);
    }
}
