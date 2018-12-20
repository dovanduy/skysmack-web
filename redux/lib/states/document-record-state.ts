import { Record, FieldSchemaViewModel, FieldValueProviderViewModel, StrIndex, LocalObject } from "@skysmack/framework";
import { RecordState } from './record-state';

export interface DocumentRecordState<TRecord extends Record<TKey>, TKey> extends RecordState<TRecord, TKey> {
    availableFields: StrIndex<LocalObject<FieldValueProviderViewModel>[]>;
    fields: StrIndex<LocalObject<FieldSchemaViewModel>[]>;
}