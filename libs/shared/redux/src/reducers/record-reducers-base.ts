import { RecordActionsBase } from "../actions";
import { Record, LocalObjectExtensions, PageExtensions, toLocalObject, HttpSuccessResponse, HttpErrorResponse, LocalObjectStatus, PageResponse, replaceLocalInnerObject, LocalObject, HttpResponse, LoadingState, GlobalProperties } from "@skysmack/framework";
import { RecordState } from './../states/record-state';
import { GetPagedEntitiesSuccessPayload, GetSingleEntitySuccessPayload, GetPagedEntitiesPayload } from '../payloads';
import { ReduxAction } from '../action-types/redux-action';
import { cancelRecordAction } from './cancel-record-action';
import { ReduxOfflineMeta } from '../metas/offline-redux/redux-offline-meta';
import { CommitMeta } from '../metas/offline-redux/commit-meta';
import { RollbackMeta } from '../metas/offline-redux/rollback-meta';

export function recordReducersBase<TState extends RecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(state: TState, action: any, prefix: string = ''): TState {
    let newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + RecordActionsBase.CANCEL_RECORD_ACTION: {
            return cancelRecordAction<TState, TRecord, TKey>(newState, action);
        }
        case prefix + RecordActionsBase.GET_PAGED: {
            const castedAction: ReduxAction<GetPagedEntitiesPayload> = action;
            const page = new PageResponse<TKey>({
                pageNumber: castedAction.payload.pagedQuery.pageNumber,
                pageSize: castedAction.payload.pagedQuery.pageSize,
                ids: [],
                links: null,
                query: castedAction.payload.pagedQuery.rsqlFilter.toList().build(),
                sort: castedAction.payload.pagedQuery.sort.build()
            });
            newState.localPageTypes[castedAction.payload.packagePath] = PageExtensions.mergeOrAddPageStatus(newState.localPageTypes[castedAction.payload.packagePath], page, LoadingState.Loading);
            return newState;
        }
        case prefix + RecordActionsBase.GET_PAGED_SUCCESS: {
            const castedAction: ReduxAction<GetPagedEntitiesSuccessPayload<TRecord, TKey>> = action;
            newState.localPageTypes[castedAction.payload.packagePath] = PageExtensions.mergeOrAddPage(newState.localPageTypes[castedAction.payload.packagePath], castedAction.payload.page);
            newState.localRecords[castedAction.payload.packagePath] = LocalObjectExtensions.mergeOrAddLocal(newState.localRecords[castedAction.payload.packagePath], castedAction.payload.entities.map(x => toLocalObject(x)));
            return newState;
        }
        case prefix + RecordActionsBase.GET_PAGED_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }
        case prefix + RecordActionsBase.GET_SINGLE_SUCCESS: {
            const castedAction: ReduxAction<GetSingleEntitySuccessPayload<TRecord, TKey>> = action;
            newState.localRecords[castedAction.payload.packagePath] = LocalObjectExtensions.mergeOrAddLocal(newState.localRecords[castedAction.payload.packagePath], [toLocalObject(castedAction.payload.entity)], undefined, true);
            return newState;
        }
        case prefix + RecordActionsBase.GET_SINGLE_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            if (!GlobalProperties.production) {
                console.log('Error. Error Action:', castedAction);
            }
            return newState;
        }

        case prefix + RecordActionsBase.ADD: {
            const castedAction: ReduxAction<null, ReduxOfflineMeta<TRecord[], HttpResponse, LocalObject<TRecord, TKey>[]>> = action;
            const stateKey = castedAction.meta.offline.commit.meta.stateKey;
            const recordsToBeCreated = castedAction.meta.offline.commit.meta.value;
            newState.localRecords[stateKey] = LocalObjectExtensions.mergeOrAddLocal(newState.localRecords[stateKey], recordsToBeCreated);
            return newState;
        }
        case prefix + RecordActionsBase.ADD_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<TRecord[] | TRecord>, CommitMeta<LocalObject<TRecord, TKey>[]>> = action;
            const body = castedAction.payload.body;
            const newObjects = (Array.isArray(body) ? body : [body]).map((newObject, index) => replaceLocalInnerObject(castedAction.meta.value[index], newObject));
            newState.localRecords[castedAction.meta.stateKey] = LocalObjectExtensions.mergeOrAddLocal<TRecord, TKey>(newState.localRecords[castedAction.meta.stateKey], newObjects);
            return newState;
        }
        case prefix + RecordActionsBase.ADD_FAILURE: {
            setActionError(action, 'Add error: ');
            return newState;
        }
        case prefix + RecordActionsBase.UPDATE: {
            const castedAction: ReduxAction<null, ReduxOfflineMeta<TRecord[], HttpResponse, LocalObject<TRecord, TKey>[]>> = action;
            const stateKey = castedAction.meta.offline.commit.meta.stateKey;
            const recordsToBeUpdated = castedAction.meta.offline.commit.meta.value;
            newState.localRecords[stateKey] = LocalObjectExtensions.mergeOrAddLocal(newState.localRecords[stateKey], recordsToBeUpdated, LocalObjectStatus.MODIFYING);

            return newState;
        }
        case prefix + RecordActionsBase.UPDATE_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<TRecord[] | TRecord>, CommitMeta<LocalObject<TRecord, TKey>[]>> = action;
            const body = castedAction.payload.body;
            const updatedObjects = (Array.isArray(body) ? body : [body]).map((newObject, index) => replaceLocalInnerObject(castedAction.meta.value[index], newObject, LocalObjectStatus.OK));
            newState.localRecords[castedAction.meta.stateKey] = LocalObjectExtensions.mergeOrAddLocal<TRecord, TKey>(newState.localRecords[castedAction.meta.stateKey], updatedObjects, LocalObjectStatus.OK);
            return newState;
        }
        case prefix + RecordActionsBase.UPDATE_FAILURE: {
            setActionError(action, 'Update error: ');
            return newState;
        }
        case prefix + RecordActionsBase.DELETE_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<TRecord[] | TRecord>, CommitMeta<LocalObject<TRecord, TKey>[]>> = action;
            castedAction.meta.value.forEach(record => {
                delete newState.localRecords[castedAction.meta.stateKey][record.localId];
            });
            return newState;
        }
        case prefix + RecordActionsBase.DELETE_FAILURE: {
            setActionError(action, 'Delete error: ');
            return newState;
        }
        default:
            return state;
    }
}

function setActionError<TRecord extends Record<TKey>, TKey>(action: ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<TRecord, TKey>[]>>, message: string = 'Error: '): void {
    action.meta.value.forEach(record => {
        record.error = true;
        if (!record.object.id) {
            record.object.id = 0 as any;
        }
    });
    if (!GlobalProperties.production) {
        console.log(message, action);
    }
}