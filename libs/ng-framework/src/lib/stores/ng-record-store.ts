import { Record, StrIndex, LocalPageTypes, LocalObject, hasValue, dictionaryToArray, safeUndefinedTo, DependencyOptions } from '@skysmack/framework';
import { RecordStore, RecordState } from '@skysmack/redux';
import { Observable, combineLatest, from } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { map, mergeMap } from 'rxjs/operators';
import { getPackageDendencyAsStream } from '../helpers/ng-helpers';
import { NgSkysmackStore } from '@skysmack/ng-core';

export abstract class NgRecordStore<TState, TRecord extends Record<TKey>, TKey> implements RecordStore<TRecord, TKey>  {

    protected identifier = 'id';

    constructor(
        protected store: NgRedux<TState>,
        protected skysmackStore: NgSkysmackStore,
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

    protected getWithDependencies = (packagePath: string, options: DependencyOptions[], dependencyIndexes: number[] = []): Observable<LocalObject<TRecord, TKey>[]> => {
        const options$ = from(options);
        const targetPackage$ = getPackageDendencyAsStream(this.skysmackStore, packagePath, dependencyIndexes);
        const records$ = this.getRecords(packagePath);

        return options$.pipe(
            mergeMap(option => targetPackage$.pipe(
                mergeMap(targetPackage => combineLatest(
                    records$,
                    this.getDependencies(targetPackage.object.path, option.stateSelector)
                ).pipe(
                    map(([records, dependencies]) => this.mapRecordsDependencies(records, dependencies, option.relationIdSelector, option.relationSelector)),
                ))
            ))
        );
    }

    protected getSingleWithDependency = (packagePath: string, id: TKey, options: DependencyOptions[], dependencyIndexes: number[] = []): Observable<LocalObject<TRecord, TKey>> => {
        const options$ = from(options);
        const targetPackage$ = getPackageDendencyAsStream(this.skysmackStore, packagePath, dependencyIndexes);
        const record$ = this.getSingleRecord(packagePath, id);

        return options$.pipe(
            mergeMap(option => targetPackage$.pipe(
                mergeMap(targetPackage => combineLatest(
                    record$,
                    this.getDependencies(targetPackage.object.path, option.stateSelector)
                ).pipe(
                    map(([record, dependencies]) => this.mapRecordDependency(record, dependencies, option.relationIdSelector, option.relationSelector)),
                ))
            ))
        );
    }

    protected getSingleWithDependencies = (packagePath: string, id: TKey, options: DependencyOptions[], dependencyIndexes: number[] = []): Observable<LocalObject<TRecord, TKey>> => {
        const options$ = from(options);
        const targetPackage$ = getPackageDendencyAsStream(this.skysmackStore, packagePath, dependencyIndexes);
        const record$ = this.getSingleRecord(packagePath, id);

        return options$.pipe(
            mergeMap(option => targetPackage$.pipe(
                mergeMap(targetPackage => combineLatest(
                    record$,
                    this.getDependencies(targetPackage.object.path, option.stateSelector)
                ).pipe(
                    map(([record, dependencies]) => this.mapRecordDependencies(record, dependencies, option.relationIdSelector, option.relationSelector)),
                ))
            ))
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
        );
    }

    protected getRecords(packagePath: string): Observable<LocalObject<TRecord, TKey>[]> {
        return this.getState<RecordState<TRecord, TKey>>().pipe(
            map(state => state.localRecords[packagePath]),
            safeUndefinedTo('object'),
            dictionaryToArray<LocalObject<TRecord, TKey>>()
        );
    }

    protected getSingleRecord(packagePath: string, id: TKey): Observable<LocalObject<TRecord, TKey>> {
        return this.get(packagePath).pipe(
            map(records => records.find(record => record.object[this.identifier].toString() === id.toString())),
            hasValue()
        );
    }

    protected mapRecordsDependencies(records: LocalObject<any, any>[], dependencies: LocalObject<any, any>[], relationIdSelector: string, relationSelector: string): LocalObject<any, any>[] {
        for (let index = 0; index < records.length; index++) {
            const record = records[index];
            if (record.object[relationIdSelector] && record.object[relationIdSelector] > 0) {
                record.object[relationSelector] = dependencies.find(dependency => dependency.object.id === record.object[relationIdSelector]);
            }
        }
        return records;
    }

    protected mapRecordDependency(record: LocalObject<any, any>, dependencies: LocalObject<any, any>[], relationIdSelector: string, relationSelector: string): LocalObject<any, any> {
        record.object[relationSelector] = dependencies.find(dependency => dependency.object[relationIdSelector] === record.object.id);
        return record;
    }

    protected mapRecordDependencies(record: LocalObject<any, any>, dependencies: LocalObject<any, any>[], relationIdSelector: string, relationSelector: string): LocalObject<any, any> {
        record.object[relationSelector] = dependencies.filter(dependency => dependency.object[relationIdSelector] === record.object.id);
        return record;
    }
}


