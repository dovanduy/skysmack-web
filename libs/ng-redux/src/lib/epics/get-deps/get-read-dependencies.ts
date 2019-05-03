import { RecordActionsBase, ReduxAction, GetPagedEntitiesSuccessPayload, GetSingleEntitySuccessPayload, CommitMeta, ReduxOfflineMeta } from '@skysmack/redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import { GetSingleDependencyOptions, getSingleDependency } from './get-single-dependencies';
import { GetDependenciesOptions, getPagedDependencies } from './get-paged-dependencies';
import { NgRecordStore } from '../../stores/ng-record-store';
import { SkysmackStore } from '../../stores/skysmack-store';
import { HttpSuccessResponse, LocalObject, HttpResponse } from '@skysmack/framework';

export interface GetCrudDependencies {
    prefix: string;
    relationIdSelector: string;
    relationSelector: string;
    rsqlIdSelector: string;
    skysmackStore: SkysmackStore;
    store: NgRecordStore<any, any, any>;
    actions: RecordActionsBase<any, any>;
    packageDependencyIndex?: number;
}

export const getReadDependencies = (options: GetCrudDependencies): any => {
    const getPagedDeps = (action$: ActionsObservable<any>): any => action$.pipe(
        ofType(options.prefix + RecordActionsBase.GET_PAGED_SUCCESS),
        map((action: ReduxAction<GetPagedEntitiesSuccessPayload<any, any>>) => getPagedDependencies({
            action,
            relationIdSelector: options.relationIdSelector,
            relationSelector: options.relationSelector,
            rsqlIdSelector: options.rsqlIdSelector,
            skysmackStore: options.skysmackStore,
            store: options.store,
            actions: options.actions,
            packageDependencyIndex: options.packageDependencyIndex
        } as GetDependenciesOptions)),
        map(() => ({ type: options.prefix + 'RETRIEVED_DEPENDENCIES_GET_PAGED_SUCCESS' }))
    );

    const getSingleDeps = (action$: ActionsObservable<any>): any => action$.pipe(
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
        map(() => ({ type: options.prefix + 'RETRIEVED_DEPENDENCIES_GET_SINGLE_SUCCESS' }))
    );

    const getSingleDepsOnCreateUpdate = (action$: ActionsObservable<any>): any => action$.pipe(
        ofType(
            options.prefix + RecordActionsBase.ADD,
            options.prefix + RecordActionsBase.UPDATE
        ),
        map((action: ReduxAction<any, ReduxOfflineMeta<any[], HttpResponse, LocalObject<any, unknown>[]>>) => getSingleDependency({
            entity: action.meta.offline.effect.request.body[0],
            packagePath: action.meta.offline.commit.meta.stateKey,
            relationIdSelector: options.relationIdSelector,
            relationSelector: options.relationSelector,
            skysmackStore: options.skysmackStore,
            store: options.store,
            actions: options.actions,
            packageDependencyIndex: options.packageDependencyIndex
        } as GetSingleDependencyOptions)),
        map(() => ({ type: options.prefix + 'RETRIEVED_DEPENDENCIES_GET_SINGLE_SUCCESS_ON_CREATE_UPDATE' }))
    );

    return [
        getPagedDeps,
        getSingleDeps,
        getSingleDepsOnCreateUpdate
    ];
};
