import { Record, LocalObject } from '@skysmack/framework';

export class RollbackMeta<TRecord extends Record<TKey>, TKey> {
    constructor(
        public stateKey: string,
        public records: LocalObject<TRecord>[]
    ) { }
}
