import { RecordActionsBase, ReduxAction, GetPagedEntitiesSuccessPayload, GetSingleEntitySuccessPayload, CommitMeta } from '@skysmack/redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import { GetDependenciesOptions, getDependencies } from './get-paged-dependencies';
import { NgRecordStore } from '../../stores/ng-record-store';
import { SkysmackStore } from '../../stores/skysmack-store';
import { getSingleDependency, GetSingleDependencyOptions } from './get-single-dependency';
import { HttpSuccessResponse, LocalObject } from '@skysmack/framework';
import { getSingleDependencies, GetSingleDependenciesOptions } from './get-single-dependencies';

export interface GetCrudDependencies {
    prefix: string;
    relationIdSelector?: string;
    relationSelector: string;
    rsqlIdSelector: string;
    skysmackStore: SkysmackStore;
    store: NgRecordStore<any, any, any>;
    actions: RecordActionsBase<any, any>;
    packageDependencyIndex?: number;
}

export const getReadDependencies = (options: GetCrudDependencies): any => {
    const getDeps = (action$: ActionsObservable<any>): any => action$.pipe(
        ofType(options.prefix + RecordActionsBase.GET_PAGED_SUCCESS),
        map((action: ReduxAction<GetPagedEntitiesSuccessPayload<any, any>>) => getDependencies({
            action,
            relationIdSelector: options.relationIdSelector,
            relationSelector: options.relationSelector,
            rsqlIdSelector: options.rsqlIdSelector,
            skysmackStore: options.skysmackStore,
            store: options.store,
            actions: options.actions,
            packageDependencyIndex: options.packageDependencyIndex
        } as GetDependenciesOptions)),
        map(() => ({ type: options.prefix + 'DEPENDENCIES_REQUESTED' }))
    );

    const getSingleDep = (action$: ActionsObservable<any>): any => action$.pipe(
        ofType(options.prefix + RecordActionsBase.GET_SINGLE_SUCCESS),
        map((action: ReduxAction<GetSingleEntitySuccessPayload<any, any>>) => getSingleDependency({
            entity: action.payload.entity,
            packagePath: action.payload.packagePath,
            relationIdSelector: options.relationIdSelector,
            relationSelector: options.relationSelector,
            skysmackStore: options.skysmackStore,
            store: options.store,
            actions: options.actions,
            packageDependencyIndex: options.packageDependencyIndex
        } as GetSingleDependencyOptions)),
        map(() => ({ type: options.prefix + 'SINGLE_DEPENDENCY_REQUESTED' }))
    );

    const getAddUpdateDep = (action$: ActionsObservable<any>): any => action$.pipe(
        ofType(
            options.prefix + RecordActionsBase.ADD_SUCCESS,
            options.prefix + RecordActionsBase.UPDATE_SUCCESS
        ),
        map((action: ReduxAction<HttpSuccessResponse<any[]>, CommitMeta<LocalObject<any, any>[]>>) => getSingleDependency({
            entity: action.payload.body[0],
            packagePath: action.meta.stateKey,
            relationIdSelector: options.relationIdSelector,
            relationSelector: options.relationSelector,
            skysmackStore: options.skysmackStore,
            store: options.store,
            actions: options.actions,
            packageDependencyIndex: options.packageDependencyIndex
        } as GetSingleDependencyOptions)),
        map(() => ({ type: options.prefix + 'ADD_UPDATE_SINGLE_DEPENDENCY_REQUESTED' }))
    );

    const getSingleDeps = (action$: ActionsObservable<any>): any => action$.pipe(
        ofType(options.prefix + RecordActionsBase.GET_SINGLE_SUCCESS),
        map((action: ReduxAction<GetSingleEntitySuccessPayload<any, any>>) => getSingleDependencies({
            entity: action.payload.entity,
            packagePath: action.payload.packagePath,
            relationIdSelector: options.relationIdSelector,
            relationSelector: options.relationSelector,
            skysmackStore: options.skysmackStore,
            store: options.store,
            actions: options.actions,
            packageDependencyIndex: options.packageDependencyIndex
        } as GetSingleDependenciesOptions)),
        map(() => ({ type: options.prefix + 'SINGLE_DEPENDENCIES_REQUESTED' }))
    );


    return [
        getDeps,
        getSingleDep,
        getAddUpdateDep,
        getSingleDeps
    ];
};
