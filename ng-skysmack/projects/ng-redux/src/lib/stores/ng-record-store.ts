import { Record, StrIndex, LocalPageTypes, LocalObject, hasValue, dictionaryToArray, safeUndefinedTo, defined } from '@skysmack/framework';
import { RecordStore, RecordState } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { map, tap } from 'rxjs/operators';

export abstract class NgRecordStore<TState, TRecord extends Record<TKey>, TKey> implements RecordStore<TRecord, TKey>  {
    constructor(
        protected store: NgRedux<TState>,
        protected stateKey: string
    ) { }

    public get(packagePath: string): Observable<LocalObject<TRecord, TKey>[]> {
        console.log('get');
        return this.getState<RecordState<TRecord, TKey>>().pipe(
            map(state => state.localRecords[packagePath]),
            tap(x => console.log('get', x)),
            safeUndefinedTo('object'),
            dictionaryToArray<LocalObject<TRecord, TKey>>()
        );
    }

    public getSingle(packagePath: string, id: TKey): Observable<LocalObject<TRecord, TKey>> {
        return this.get(packagePath).pipe(
            map(records => records.find(record => record.object.id.toString() === id.toString())),
            hasValue()
        );
    }

    public getPages(packagePath: string): Observable<StrIndex<LocalPageTypes<TKey>>> {
        console.log('getPages');
        return this.getState<RecordState<TRecord, TKey>>().pipe(
            tap(x => console.log('getPages stream', x)),
            map(state => state.localPageTypes[packagePath]),
            hasValue()
        );
    }

    protected getState<TStateType>(): Observable<TStateType> {
        return this.store.select(state => state[this.stateKey]);
    }
}


