import { Record, FieldSchemaViewModel, LocalObject, safeUndefinedTo, FieldValueProviderViewModel, hasValue } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { map } from 'rxjs/operators';
import { NgRecordReduxStore } from './ng-record-redux-store';
import { DocumentRecordState } from '@skysmack/redux';

export abstract class NgDocumentRecordReduxStore<TState, TRecord extends Record<TKey>, TKey> extends NgRecordReduxStore<TState, TRecord, TKey>  {
    constructor(
        protected store: NgRedux<TState>,
        protected stateKey: string
    ) {
        super(store, stateKey);
    }

    public getFields(packagePath: string): Observable<LocalObject<FieldSchemaViewModel>[]> {
        return this.getState<DocumentRecordState<TRecord, TKey>>().pipe(map(state => state.fields[packagePath]), safeUndefinedTo('array'));
    }

    public getSingleField(key: string, packagePath: string): Observable<LocalObject<FieldSchemaViewModel>> {
        return this.getState<DocumentRecordState<TRecord, TKey>>().pipe(
            map(state => state.fields[packagePath]),
            safeUndefinedTo('array'),
            map(fields => fields.find(record => record.object.key === key)),
            hasValue()
        );
    }

    public getAvailableFields(packagePath: string): Observable<LocalObject<FieldValueProviderViewModel>[]> {
        return this.getState<DocumentRecordState<TRecord, TKey>>().pipe(map(state => state.availableFields[packagePath]), safeUndefinedTo('array'));
    }
}
