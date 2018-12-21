import { Identifiable } from './identifiable';

export abstract class Record<TKey> extends Identifiable<TKey> {
    public id: TKey;
    public get identifier(): TKey {
        return this.id;
    }
    public set identifier(v: TKey) {
        this.id = v;
    }
}
