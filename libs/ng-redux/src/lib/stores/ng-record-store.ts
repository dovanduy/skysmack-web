import { Record, StrIndex, LocalPageTypes, LocalObject, hasValue, dictionaryToArray, safeUndefinedTo, defined, DependencyOptions } from '@skysmack/framework';
import { RecordStore, RecordState } from '@skysmack/redux';
import { Observable, combineLatest } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { map, switchMap } from 'rxjs/operators';
import { getPackageDendencyAsStream } from '../helpers/ng-helpers';
import { NgSkysmackStore } from '@skysmack/ng-core';

export abstract class NgRecordStore<TState, TRecord extends Record<TKey>, TKey> implements RecordStore<TRecord, TKey>  {
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

    protected getWithDependencies = (packagePath: string, options: DependencyOptions): Observable<LocalObject<TRecord, TKey>[]> => {
        return getPackageDendencyAsStream(this.skysmackStore, packagePath, options.dependencyIndexes).pipe(
            switchMap(targetPackage => combineLatest(
                this.getRecords(targetPackage.object.path),
                this.getDependencies(targetPackage.object.path, options.stateSelector)
            ).pipe(
                map(([records, dependencies]) => {
                    return this.mapRecordsDependencies(records, dependencies, options.relationIdSelector, options.relationSelector);
                })
            ))
        );
    }

    protected getSingleWithDependency = (packagePath: string, id: TKey, options: DependencyOptions): Observable<LocalObject<TRecord, TKey>> => {
        return getPackageDendencyAsStream(this.skysmackStore, packagePath, options.dependencyIndexes).pipe(
            switchMap(targetPackage => combineLatest(
                this.getSingleRecord(targetPackage.object.path, id),
                this.getDependencies(targetPackage.object.path, options.stateSelector)
            ).pipe(
                map(([record, dependencies]) => {
                    return this.mapRecordDependency(record, dependencies, options.relationIdSelector, options.relationSelector);
                })
            ))
        );
    }

    protected getSingleWithDependencies = (packagePath: string, id: TKey, options: DependencyOptions): Observable<LocalObject<TRecord, TKey>> => {
        return getPackageDendencyAsStream(this.skysmackStore, packagePath, options.dependencyIndexes).pipe(
            switchMap(targetPackage => combineLatest(
                this.getSingleRecord(targetPackage.object.path, id),
                this.getDependencies(targetPackage.object.path, options.stateSelector)
            ).pipe(
                map(([record, dependencies]) => {
                    return this.mapRecordDependency(record, dependencies, options.relationIdSelector, options.relationSelector);
                })
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
            map(records => records.find(record => record.object.id.toString() === id.toString())),
            hasValue()
        );
    }

    protected mapRecordDependency(record: LocalObject<any, any>, dependencies: LocalObject<any, any>[], relationIdSelector: string, relationSelector: string): LocalObject<any, any> {
        record.object[relationSelector] = dependencies.filter(dependency => dependency.object[relationIdSelector] === record.object.id);
        return record;
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
}


