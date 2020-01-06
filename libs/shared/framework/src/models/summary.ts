export class Summary {
    public packagePath: string;
    public component: any;

    public constructor(init?: Partial<Summary>) {
        Object.assign(this, init);
    }
}
