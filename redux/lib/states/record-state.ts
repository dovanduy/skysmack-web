import { Record, LocalObject, LocalPageTypes, StrIndex } from "@skysmack/framework";

export interface RecordState<TRecord extends Record<TKey>, TKey> {
    localPageTypes: StrIndex<LocalPageTypes<TKey>>;
    localRecords: StrIndex<LocalObject<TRecord>>;
}