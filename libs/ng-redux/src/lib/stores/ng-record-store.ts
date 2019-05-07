import { Record, StrIndex, LocalPageTypes, LocalObject, hasValue, dictionaryToArray, safeUndefinedTo, defined } from '@skysmack/framework';
import { RecordStore, RecordState } from '@skysmack/redux';
import { Observable, combineLatest } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { map, tap } from 'rxjs/operators';

export abstract class NgRecordStore<TState, TRecord extends Record<TKey>, TKey> implements RecordStore<TRecord, TKey>  {
    constructor(
        protected store: NgRedux<TState>,
        protected stateKey: string
    ) { }

    public get(packagePath: string): Observable<LocalObject<TRecord, TKey>[]> {
        return this.getRecords(packagePath);
    }

    public getSingle(packagePath: string, id: TKey): Observable<LocalObject<TRecord, TKey>> {
        return this.getSingleRecord(packagePath, id);
    }

    public getPages(packagePath: string): Observable<StrIndex<LocalPageTypes<TKey>>> {
        return this.getState<RecordState<TRecord, TKey>>().pipe(
            map(state => state.localPageTypes[packagePath]),
            hasValue()
        );
    }

    protected getWithDependencies = (packagePath: string, relationSelector: string, relationIdSelector: string, stateSelector: string): Observable<LocalObject<TRecord, TKey>[]> => {
        return combineLatest(
            this.getRecords(packagePath),
            this.getDependencies(packagePath, stateSelector)).pipe(
                map(values => {
                    const records = values[0];
                    const dependencies = values[1];
                    for (let index = 0; index < records.length; index++) {
                        const record = records[index];
                        if (record.object[relationIdSelector] && record.object[relationIdSelector] > 0) {
                            record.object[relationSelector] = dependencies.find(dependency => dependency.object.id === record.object[relationIdSelector]);
                        }
                    }
                    return records;
                })
            );
    }

    protected getSingleWithDependencies = (packagePath: string, id: TKey, relationSelector: string, relationIdSelector: string, stateSelector: string): Observable<LocalObject<TRecord, TKey>> => {
        return combineLatest(
            this.getSingleRecord(packagePath, id),
            this.getDependencies(packagePath, stateSelector)).pipe(
                map(values => {
                    const record = values[0];
                    const dependencies = values[1];
                    if (record.object[relationIdSelector] && record.object[relationIdSelector] > 0) {
                        record.object[relationSelector] = dependencies.find(dependency => dependency.object.id === record.object[relationIdSelector]);
                    }
                    return record;
                })
            );
    }

    protected getState<TStateType>(): Observable<TStateType> {
        return this.store.select(state => state[this.stateKey]);
    }

    protected getDependencies(packagePath: string, stateSelector: string): Observable<LocalObject<any, number>[]> {
        return this.store.select(state => state[stateSelector]).pipe(
            map(state => state.localRecords[packagePath]),
            safeUndefinedTo('object'),
            dictionaryToArray<LocalObject<TRecord, TKey>>(),
            hasValue()
        );
    }

    private getRecords(packagePath: string): Observable<LocalObject<TRecord, TKey>[]> {
        return this.getState<RecordState<TRecord, TKey>>().pipe(
            map(state => state.localRecords[packagePath]),
            safeUndefinedTo('object'),
            dictionaryToArray<LocalObject<TRecord, TKey>>()
        );
    }

    public getSingleRecord(packagePath: string, id: TKey): Observable<LocalObject<TRecord, TKey>> {
        return this.get(packagePath).pipe(
            map(records => records.find(record => record.object.id.toString() === id.toString())),
            hasValue()
        );
    }
}


