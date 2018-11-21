import { OfflineMeta } from './offline-meta';
import { Record } from '@skysmack/framework';

export class ReduxOfflineMeta<TBody, TRecord extends Record<TKey>, TKey> {
    constructor(
        public offline: OfflineMeta<TBody, TRecord, TKey>
    ) {
    }
}
