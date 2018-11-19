import { Record, LocalObject, LocalPageTypes, StrIndex } from "@skysmack/framework";

export interface PackageRecordState<TRecord extends Record<TKey>, TKey> {
    [key: string]: RecordState<TRecord, TKey>;
}

export interface RecordState<TRecord extends Record<TKey>, TKey> {
    localPageTypes: StrIndex<LocalPageTypes<TKey>>;
    localRecords: StrIndex<LocalObject<TRecord>>;
}