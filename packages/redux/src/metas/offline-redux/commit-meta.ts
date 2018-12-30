import { Record, LocalObject } from '@skysmack/framework';

export class CommitMeta<TRecord extends Record<TKey>, TKey>  {
    constructor(
        public stateKey: string,
        public records: LocalObject<TRecord, TKey>[],
    ) { }
}
