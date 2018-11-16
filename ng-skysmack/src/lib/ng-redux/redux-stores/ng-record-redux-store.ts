import { Record, StrIndex, LocalPageTypes, LocalObject, NumIndex, safeHasValue, log, hasValue } from '@skysmack/framework';
import { RecordReduxStore } from '@skysmack/redux';
import { Observable, pipe } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { map, filter } from 'rxjs/operators';

export abstract class NgRecordReduxStore<TState, TRecord extends Record<TKey>, TKey> implements RecordReduxStore<TRecord, TKey>  {
    constructor(
        protected store: NgRedux<TState>,
        protected stateKey: string
    ) { }

    public get(packagePath: string): Observable<LocalObject<TRecord>[]> {
        return this.store.select(state => state[this.stateKey][packagePath]).pipe(
            hasValue(),
            map(x => x.localRecords),
            hasValue(),
            dictionaryToArray<LocalObject<TRecord>>()
        );
    }

    public getSingle(packagePath: string, id: TKey): Observable<LocalObject<TRecord>> {
        throw new Error('Method not implemented.');
    }

    public getPages(packagePath: string, pageSize: number, query: string, sort: string): Observable<StrIndex<LocalPageTypes<TKey>>> {
        throw new Error('Method not implemented.');
    }
}

const dictionaryToArray = <TValue>() => pipe(
    map<StrIndex<TValue> | NumIndex<TValue>, TValue[]>(x => Object.keys(x).map(key => x[key]))
);
