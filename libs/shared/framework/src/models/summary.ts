export class Summary<TKey> {
    public packagePath: string;
    public component: any;
    public entityId: TKey;

    public constructor(init?: Partial<Summary<TKey>>) {
        Object.assign(this, init);
    }
}
