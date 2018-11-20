import { Record, FieldSchemaViewModel, FieldValueProviderViewModel, StrIndex } from "@skysmack/framework";
import { RecordState } from './record-state';

export interface DocumentRecordState<TRecord extends Record<TKey>, TKey> extends RecordState<TRecord, TKey> {
    availableFields: StrIndex<FieldValueProviderViewModel[]>;
    fields: StrIndex<FieldSchemaViewModel[]>;
}