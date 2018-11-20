import { Record, FieldSchemaViewModel, FieldValueProviderViewModel } from "@skysmack/framework";
import { RecordState } from './record-state';

export interface PackageDocumentRecordState<TRecord extends Record<TKey>, TKey> {
    [key: string]: DocumentRecordState<TRecord, TKey>;
}

export interface DocumentRecordState<TRecord extends Record<TKey>, TKey> extends RecordState<TRecord, TKey> {
    availableFields: FieldValueProviderViewModel[];
    fields: FieldSchemaViewModel[];
}