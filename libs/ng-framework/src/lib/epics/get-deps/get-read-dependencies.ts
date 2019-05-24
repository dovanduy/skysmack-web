import { RecordActionsBase, ReduxAction, GetPagedEntitiesSuccessPayload, GetSingleEntitySuccessPayload, CommitMeta } from '@skysmack/redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import { GetDependenciesOptions, getDependencies } from './get-paged-dependencies';
import { NgRecordStore } from '../../stores/ng-record-store';
import { SkysmackStore } from '../../stores/skysmack-store';
import { getSingleDependency, GetSingleDependencyOptions } from './get-single-dependency';
import { getSingleDependencies, GetSingleDependenciesOptions } from './get-single-dependencies';

export interface GetCrudDependencies {
    prefix: string;
    relationIdSelector?: string;
    rsqlIdSelector: string;
    skysmackStore: SkysmackStore;
    store: NgRecordStore<any, any, any>;
    actions: RecordActionsBase<any, any>;
    dependencyIndexes?: number[];
    many?: boolean;
}

export const getReadDependencies = (options: GetCrudDependencies): any => {
    options.many = options.many ? options.many : false;

    const getDeps = (action$: ActionsObservable<any>): any => action$.pipe(
        ofType(options.prefix + RecordActionsBase.GET_PAGED_SUCCESS),
        map((action: ReduxAction<GetPagedEntitiesSuccessPayload<any, any>>) => getDependencies({
            action,
            relationIdSelector: options.relationIdSelector,
            rsqlIdSelector: options.rsqlIdSelector,
            skysmackStore: options.skysmackStore,
            store: options.store,
            actions: options.actions,
            dependencyIndexes: options.dependencyIndexes
        } as GetDependenciesOptions)),
        map(() => ({ type: options.prefix + 'DEPENDENCIES_REQUESTED' }))
    );

    const getSingleDep = (action$: ActionsObservable<any>): any => action$.pipe(
        ofType(options.prefix + RecordActionsBase.GET_SINGLE_SUCCESS),
        map((action: ReduxAction<GetSingleEntitySuccessPayload<any, any>>) => {
            if (options.many) {
                return getSingleDependencies({
                    entity: action.payload.entity,
                    packagePath: action.payload.packagePath,
                    relationIdSelector: options.relationIdSelector,
                    skysmackStore: options.skysmackStore,
                    store: options.store,
                    actions: options.actions,
                    dependencyIndexes: options.dependencyIndexes
                } as GetSingleDependenciesOptions);
            } else {
                return getSingleDependency({
                    entity: action.payload.entity,
                    packagePath: action.payload.packagePath,
                    relationIdSelector: options.relationIdSelector,
                    skysmackStore: options.skysmackStore,
                    store: options.store,
                    actions: options.actions,
                    dependencyIndexes: options.dependencyIndexes
                } as GetSingleDependencyOptions)
            }
        }),
        map(() => ({ type: options.prefix + options.many ? 'SINGLE_DEPENDENCIES_REQUESTED' : 'SINGLE_DEPENDENCY_REQUESTED' }))
    );

    return [
        getDeps,
        getSingleDep
    ];
};
