import { RecordActionsBase, ReduxAction, GetPagedEntitiesSuccessPayload, GetSingleEntitySuccessPayload, CommitMeta, ReduxOfflineMeta } from '@skysmack/redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import { GetSingleDependencyOptions, getSingleDependency } from './get-single-dependencies';
import { GetDependenciesOptions, getPagedDependencies } from './get-paged-dependencies';
import { NgRecordStore } from '../../stores/ng-record-store';
import { SkysmackStore } from '../../stores/skysmack-store';
import { LocalObject, HttpResponse, HttpSuccessResponse } from '@skysmack/framework';

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
        map(() => ({ type: options.prefix + 'GET_DEPENDENCIES_PAGED_SUCCESS' }))
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
        map(() => ({ type: options.prefix + 'GET_DEPENDENCIES_SINGLE_SUCCESS' }))
    );

    // TODO: Do we need to get deps before add/update success?
    // const getSingleDepsOnCreateUpdate = (action$: ActionsObservable<any>): any => action$.pipe(
    //     ofType(
    //         options.prefix + RecordActionsBase.ADD,
    //         options.prefix + RecordActionsBase.UPDATE
    //     ),
    //     map((action: ReduxAction<any, ReduxOfflineMeta<any[], HttpResponse, LocalObject<any, unknown>[]>>) => getSingleDependency({
    //         entity: action.meta.offline.effect.request.body[0],
    //         packagePath: action.meta.offline.commit.meta.stateKey,
    //         relationIdSelector: options.relationIdSelector,
    //         relationSelector: options.relationSelector,
    //         skysmackStore: options.skysmackStore,
    //         store: options.store,
    //         actions: options.actions,
    //         packageDependencyIndex: options.packageDependencyIndex
    //     } as GetSingleDependencyOptions)),
    //     map(() => ({ type: options.prefix + 'GET_SINGLE_DEPENDENCY_SUCCESS' }))
    // );

    const getSingleDepsOnCreateUpdate = (action$: ActionsObservable<any>): any => action$.pipe(
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
        map(() => ({ type: options.prefix + 'GET_DEPENDENCY_CREATE_EDIT_SUCCESS' }))
    );

    return [
        getPagedDeps,
        getSingleDeps,
        getSingleDepsOnCreateUpdate
    ];
};
