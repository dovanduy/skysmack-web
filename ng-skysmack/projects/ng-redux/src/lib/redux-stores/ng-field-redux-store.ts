import { FieldSchemaViewModel, LocalObject, safeUndefinedTo, FieldValueProviderViewModel, hasValue, dictionaryToArray, StrIndex, LocalPageTypes } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { map } from 'rxjs/operators';
import { FieldState } from '@skysmack/redux';

export abstract class NgFieldReduxStore {
    constructor(
        protected store: NgRedux<FieldState>,
        protected stateKey: string
    ) { }

    public get(packagePath: string): Observable<LocalObject<FieldSchemaViewModel, string>[]> {
        return this.getState().pipe(
            map(state => state.fields[packagePath]),
            safeUndefinedTo('object'),
            dictionaryToArray<LocalObject<FieldSchemaViewModel, string>>()
        );
    }

    public getSingle(packagePath: string, key: string): Observable<LocalObject<FieldSchemaViewModel, string>> {
        return this.get(packagePath).pipe(
            map(fields => fields.find(record => record.object.key === key)),
            hasValue()
        );
    }

    public getPages(packagePath: string): Observable<StrIndex<LocalPageTypes<string>>> {
        return this.getState().pipe(
            map(state => state.localPageTypes[packagePath]),
            hasValue<StrIndex<LocalPageTypes<string>>>()
        );
    }

    public getAvailableFields(packagePath: string): Observable<LocalObject<FieldValueProviderViewModel, string>[]> {
        return this.getState().pipe(
            map(state => state.availableFields[packagePath]),
            safeUndefinedTo('object'),
            dictionaryToArray<LocalObject<FieldValueProviderViewModel, string>>()
        );
    }

    protected getState(): Observable<FieldState> {
        return this.store.select(state => state[this.stateKey]);
    }
}
