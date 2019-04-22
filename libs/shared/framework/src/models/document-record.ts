import { Record } from "./record";

export abstract class DocumentRecord<TKey> extends Record<TKey> {
    [key: string]: any | any;
    constructor(init?: Partial<DocumentRecord<TKey>>) {
        super();
        Object.assign(this, init);
    }
}
