import { Record, LocalObject, LocalPageTypes, StrIndex } from "@skysmack/framework";

export interface RecordState<TRecord extends Record<TKey>, TKey> {
    localPageTypes: StrIndex<StrIndex<LocalPageTypes<TKey>>>;
    localRecords: StrIndex<StrIndex<LocalObject<TRecord>>>;
}