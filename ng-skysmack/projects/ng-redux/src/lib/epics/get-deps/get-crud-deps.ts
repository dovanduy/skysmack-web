import { RecordActionsBase, ReduxAction, GetPagedEntitiesSuccessPayload, GetSingleEntitySuccessPayload, CommitMeta } from '@skysmack/redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import { GetSingleDependencyOptions, getSingleDependency } from './get-single-dependencies';
import { GetCreateUpdateDependenciesOptions, getCreateUpdateDependencies } from './get-create-update-dependencies';
import { GetDependenciesOptions, getDependencies } from './get-paged-dependencies';
import { HttpSuccessResponse } from '@skysmack/framework';
import { NgRecordStore } from '../../stores/ng-record-store';

export interface GetCrudDependencies {
    prefix: string;
    relationIdSelector: string;
    relationSelector: string;
    rsqlIdSelector: string;
    store: NgRecordStore<any, any, any>;
    actions: RecordActionsBase<any, any>;
}

export const getCrudDependencies = (options: GetCrudDependencies) => {

    const getDeps = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(options.prefix + RecordActionsBase.GET_PAGED_SUCCESS),
        map((action: ReduxAction<GetPagedEntitiesSuccessPayload<any, any>>) => getDependencies({
            action,
            relationIdSelector: options.relationIdSelector,
            relationSelector: options.relationSelector,
            rsqlIdSelector: options.rsqlIdSelector,
            store: options.store,
            actions: options.actions
        } as GetDependenciesOptions)),
        map(() => ({ type: options.prefix + 'RETRIEVED_DEPENDENCIES_GET_PAGED_SUCCESS' }))
    );

    const getSingleDeps = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(options.prefix + RecordActionsBase.GET_SINGLE_SUCCESS),
        map((action: ReduxAction<GetSingleEntitySuccessPayload<any, any>>) => getSingleDependency({
            action,
            relationIdSelector: options.relationIdSelector,
            relationSelector: options.relationSelector,
            store: options.store,
            actions: options.actions
        } as GetSingleDependencyOptions)),
        map(() => ({ type: options.prefix + 'RETRIEVED_DEPENDENCIES_GET_SINGLE_SUCCESS' }))
    );

    const getCreateUpdateDeps = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(
            options.prefix + RecordActionsBase.ADD_SUCCESS,
            options.prefix + RecordActionsBase.UPDATE_SUCCESS
        ),
        map((action: ReduxAction<HttpSuccessResponse<any>, CommitMeta<any>>) => getCreateUpdateDependencies({
            action,
            relationIdSelector: options.relationIdSelector,
            relationSelector: options.relationSelector,
            rsqlIdSelector: options.rsqlIdSelector,
            store: options.store,
            actions: options.actions
        } as GetCreateUpdateDependenciesOptions)),
        map(() => ({ type: options.prefix + 'RETRIEVED_DEPENDENCIES_CREATE_UPDATE_SUCCESS' }))
    );

    return [
        getDeps,
        getSingleDeps,
        getCreateUpdateDeps
    ];
};
