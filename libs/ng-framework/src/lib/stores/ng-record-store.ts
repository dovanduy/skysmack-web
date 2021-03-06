import { Record, StrIndex, LocalPageTypes, LocalObject, hasValue, dictionaryToArray, safeUndefinedTo, DependencyOptions, getProperty } from '@skysmack/framework';
import { RecordStore, RecordState } from '@skysmack/redux';
import { Observable, combineLatest, from } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { map, mergeMap, filter } from 'rxjs/operators';
import { getPackageDendencyAsStream } from '../helpers/ng-helpers';
import { SkysmackStore } from './skysmack-store';

export abstract class NgRecordStore<TState, TRecord extends Record<TKey>, TKey> implements RecordStore<TRecord, TKey>  {

    protected identifier = 'id';

    constructor(
        protected store: NgRedux<TState>,
        protected skysmackStore: SkysmackStore,
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

    /**
     * Get multiple records and set their related data properties (defined by dependency options).
     * Note: Currently this method always assumes one object pr. data property. Meaning arrays of data won't be binded correctly.
     */
    protected getWithDependencies = (packagePath: string, options: DependencyOptions[]): Observable<LocalObject<TRecord, TKey>[]> => {
        const updatedOptions = options.map(option => {
            option.targetPackage$ = getPackageDendencyAsStream(this.skysmackStore, packagePath, option.dependencyIndexes);
            return option;
        });
        const options$ = from(updatedOptions);
        const records$ = this.getRecords(packagePath);

        return options$.pipe(
            mergeMap(option => option.targetPackage$.pipe(
                mergeMap(targetPackage => combineLatest([
                    records$,
                    this.getDependencies(targetPackage.object.path, option.stateSelector)
                ]).pipe(
                    map(([records, dependencies]) => this.mapRecordsDependencies(records, dependencies, option.relationIdSelector, option.relationSelector)),
                ))
            ))
        );
    }

    // Get a single record and set its related data properties (defined by dependency options).
    // Note: This assumes the properties has ARRAYS of data.
    protected getSingleWithDependency = (packagePath: string, id: TKey, options: DependencyOptions[]): Observable<LocalObject<TRecord, TKey>> => {
        const updatedOptions = options.map(option => {
            option.targetPackage$ = getPackageDendencyAsStream(this.skysmackStore, packagePath, option.dependencyIndexes);
            return option;
        });
        const options$ = from(updatedOptions);
        const record$ = this.getSingleRecord(packagePath, id);

        return options$.pipe(
            mergeMap(option => option.targetPackage$.pipe(
                mergeMap(targetPackage => combineLatest([
                    record$,
                    this.getDependencies(targetPackage.object.path, option.stateSelector)
                ]).pipe(
                    map(([record, dependencies]) => this.mapRecordDependency(record, dependencies, option.relationIdSelector, option.relationSelector)),
                ))
            ))
        );
    }

    // Get a single record and set its related data properties (defined by dependency options).
    // Note: This assumes the properties is a single object..
    protected getSingleWithDependencies = (packagePath: string, id: TKey, options: DependencyOptions[]): Observable<LocalObject<TRecord, TKey>> => {
        const updatedOptions = options.map(option => {
            option.targetPackage$ = getPackageDendencyAsStream(this.skysmackStore, packagePath, option.dependencyIndexes);
            return option;
        });
        const options$ = from(updatedOptions);
        const record$ = this.getSingleRecord(packagePath, id);

        return options$.pipe(
            mergeMap(option => option.targetPackage$.pipe(
                mergeMap(targetPackage => combineLatest([
                    record$,
                    this.getDependencies(targetPackage.object.path, option.stateSelector)
                ]).pipe(
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
            filter(x => x),
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

    // TODO: Make this work with composite keys
    protected getSingleRecord(packagePath: string, id: TKey): Observable<LocalObject<TRecord, TKey>> {
        return this.get(packagePath).pipe(
            map(records => records.find(record => record.object[this.identifier].toString() === id.toString())),
            hasValue()
        );
    }

    // TODO: Make this work with composite keys
    protected mapRecordsDependencies(records: LocalObject<any, any>[], dependencies: LocalObject<any, any>[], relationIdSelector: string, relationSelector: string): LocalObject<any, any>[] {
        for (let index = 0; index < records.length; index++) {
            const record = records[index];
            const recordId = getProperty(record.object, relationIdSelector);
            if (recordId && (recordId > 0 || recordId !== '')) {
                record.object[relationSelector] = dependencies.find(dependency => {
                    const prop = getProperty(record.object, relationIdSelector);
                    return (dependency.object.id && dependency.object.id.toString()) === (prop && prop.toString());
                });
            }
        }
        return records;
    }

    protected mapRecordDependency(record: LocalObject<any, any>, dependencies: LocalObject<any, any>[], relationIdSelector: string, relationSelector: string): LocalObject<any, any> {
        record.object[relationSelector] = dependencies.find(dependency => {
            const prop = getProperty(record.object, relationIdSelector);
            return (dependency.object.id && dependency.object.id.toString()) === (prop && prop.toString());
        });
        return record;
    }

    protected mapRecordDependencies(record: LocalObject<any, any>, dependencies: LocalObject<any, any>[], relationIdSelector: string, relationSelector: string): LocalObject<any, any> {
        record.object[relationSelector] = dependencies.filter(dependency => {
            const prop = getProperty(record.object, relationIdSelector);
            return (dependency.object.id && dependency.object.id.toString()) === (prop && prop.toString());
        });
        return record;
    }
}


