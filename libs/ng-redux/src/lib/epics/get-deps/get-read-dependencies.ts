import { RecordActionsBase, ReduxAction, GetPagedEntitiesSuccessPayload, GetSingleEntitySuccessPayload } from '@skysmack/redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import { GetSingleDependencyOptions, getSingleDependency } from './get-single-dependencies';
import { GetDependenciesOptions, getPagedDependencies } from './get-paged-dependencies';
import { NgRecordStore } from '../../stores/ng-record-store';
import { SkysmackStore } from '../../stores/skysmack-store';

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
            action,
            relationIdSelector: options.relationIdSelector,
            relationSelector: options.relationSelector,
            skysmackStore: options.skysmackStore,
            store: options.store,
            actions: options.actions,
            packageDependencyIndex: options.packageDependencyIndex
        } as GetSingleDependencyOptions)),
        map(() => ({ type: options.prefix + 'RETRIEVED_DEPENDENCIES_GET_SINGLE_SUCCESS' }))
    );

    return [
        getPagedDeps,
        getSingleDeps
    ];
};
