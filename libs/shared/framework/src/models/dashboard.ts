export class Dashboard {
    public packagePath: string;
    public component: any;

    constructor(values: Partial<Dashboard>) {
        Object.assign(this, values);
    }
}
