import { Record, FieldSchemaViewModel, LocalObject, safeUndefinedTo, FieldValueProviderViewModel, hasValue, dictionaryToArray } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { map } from 'rxjs/operators';
import { NgRecordStore } from './ng-record-store';
import { DocumentRecordState } from '@skysmack/redux';

export abstract class NgDocumentRecordStore<TState, TRecord extends Record<TKey>, TKey> extends NgRecordStore<TState, TRecord, TKey>  {
    constructor(
        protected store: NgRedux<TState>,
        protected stateKey: string
    ) {
        super(store, stateKey);
    }

    public getFields(packagePath: string): Observable<LocalObject<FieldSchemaViewModel, string>[]> {
        return this.getState<DocumentRecordState<TRecord, TKey>>().pipe(
            map(state => state.fields[packagePath]),
            safeUndefinedTo('object'),
            dictionaryToArray<LocalObject<FieldSchemaViewModel, string>>()
        );
    }

    public getSingleField(packagePath: string, key: string): Observable<LocalObject<FieldSchemaViewModel, string>> {
        return this.getFields(packagePath).pipe(
            map(fields => fields.find(record => record.object.key === key)),
            hasValue()
        );
    }

    public getAvailableFields(packagePath: string): Observable<LocalObject<FieldValueProviderViewModel, string>[]> {
        return this.getState<DocumentRecordState<TRecord, TKey>>().pipe(
            map(state => state.availableFields[packagePath]),
            safeUndefinedTo('object'),
            dictionaryToArray<LocalObject<FieldValueProviderViewModel, string>>()
        );
    }
}
