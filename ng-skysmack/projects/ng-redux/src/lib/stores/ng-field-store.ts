import { FieldSchemaViewModel, LocalObject, safeUndefinedTo, FieldValueProviderViewModel, hasValue, dictionaryToArray, StrIndex, LocalPageTypes, log, defined } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { FieldState, EntityStore, FieldsAppState } from '@skysmack/redux';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgFieldStore implements EntityStore<FieldSchemaViewModel, string> {
    constructor(
        protected store: NgRedux<FieldsAppState>
    ) { }

    public get(stateKey: string): Observable<LocalObject<FieldSchemaViewModel, string>[]> {
        return this.getState().pipe(
            map(state => state.fields[stateKey]),
            defined(),
            // distinctUntilChanged((x, y) => {
            //     const xRecordIds = Object.keys(x);
            //     const yRecordIds = Object.keys(y);
            //     return !(xRecordIds.length === yRecordIds.length && xRecordIds.every((value, index) => value === yRecordIds[index]));
            // }),
            safeUndefinedTo('object'),
            dictionaryToArray<LocalObject<FieldSchemaViewModel, string>>(),
        );
    }

    public getSingle(stateKey: string, key: string): Observable<LocalObject<FieldSchemaViewModel, string>> {
        return this.get(stateKey).pipe(
            map(fields => fields.find(record => record.object.key === key)),
            hasValue()
        );
    }

    public getPages(stateKey: string): Observable<StrIndex<LocalPageTypes<string>>> {
        return this.getState().pipe(
            map(state => state.localPageTypes[stateKey]),
            hasValue<StrIndex<LocalPageTypes<string>>>()
        );
    }

    public getAvailableFields(stateKey: string): Observable<LocalObject<FieldValueProviderViewModel, string>[]> {
        return this.getState().pipe(
            map(state => state.availableFields[stateKey]),
            safeUndefinedTo('object'),
            dictionaryToArray<LocalObject<FieldValueProviderViewModel, string>>()
        );
    }

    protected getState(): Observable<FieldState> {
        return this.store.select(state => state.fields);
    }
}
