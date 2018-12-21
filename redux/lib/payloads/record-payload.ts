import { LocalObject, Record } from '@skysmack/framework';

export interface RecordPayload<TRecord extends Record<TKey>, TKey> {
    record: LocalObject<TRecord, TKey>;
}