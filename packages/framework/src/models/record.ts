export abstract class Record<TKey> {
    public id: TKey;
    constructor(init?: Partial<Record<TKey>>) {
        Object.assign(this, init);
    }
}
