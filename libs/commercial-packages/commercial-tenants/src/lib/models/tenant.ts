export class Tenant {
    public name: string;
    public hostname: string;
    public safeSubdomain: string;
    public state: number;
    public id: string;

    constructor(values?: Partial<Tenant>) {
        Object.assign(this, values);
    }
}
