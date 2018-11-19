import { Record, StrIndex, LocalPageTypes, LocalObject, hasValue, dictionaryToArray } from '@skysmack/framework';
import { RecordReduxStore, RecordState } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { map } from 'rxjs/operators';

export abstract class NgRecordReduxStore<TState, TRecord extends Record<TKey>, TKey> implements RecordReduxStore<TRecord, TKey>  {
    constructor(
        protected store: NgRedux<TState>,
        protected stateKey: string
    ) { }

    public get(packagePath: string): Observable<LocalObject<TRecord>[]> {
        return this.store.select(state => state[this.stateKey][packagePath]).pipe(
            hasValue<RecordState<TRecord, TKey>>(),
            map(x => x.localRecords),
            hasValue<StrIndex<LocalObject<TRecord>>>(),
            dictionaryToArray<LocalObject<TRecord>>()
        );
    }

    public getSingle(packagePath: string, id: TKey): Observable<LocalObject<TRecord>> {
        throw new Error('Method not implemented.');
    }

    // TODO: Use these? -> pageSize: number, query: string, sort: string
    public getPages(packagePath: string): Observable<StrIndex<LocalPageTypes<TKey>>> {
        return this.store.select(state => state[this.stateKey][packagePath]).pipe(
            hasValue<RecordState<TRecord, TKey>>(),
            map(x => x.localPageTypes),
            hasValue<StrIndex<LocalPageTypes<TKey>>>(),
        );
    }
}


