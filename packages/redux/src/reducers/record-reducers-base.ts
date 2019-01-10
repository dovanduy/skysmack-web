import { RecordActionsBase } from "../actions";
import { Record, LocalObjectExtensions, PageExtensions, toLocalObject, HttpSuccessResponse, HttpErrorResponse, LocalObjectStatus, PageResponse, replaceLocalInnerObject } from "@skysmack/framework";
import { RecordState } from './../states/record-state';
import { GetPagedRecordsSuccessPayload, GetSingleRecordSuccessPayload, GetPagedRecordsPayload } from '../payloads';
import { ReduxAction } from '../action-types/redux-action';
import { CommitMeta, ReduxOfflineMeta } from './../metas';
import { cancelRecordAction } from './cancel-record-action';

export function recordReducersBase<TState extends RecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(state: TState, action: any, prefix: string = ''): TState {
    state = Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + RecordActionsBase.CANCEL_RECORD_ACTION: {
            return cancelRecordAction<TState, TRecord, TKey>(newState, action);
        }
        case prefix + RecordActionsBase.GET_PAGED: {
            const castedAction: ReduxAction<GetPagedRecordsPayload> = action;
            const page = new PageResponse<TKey>({
                pageNumber: castedAction.payload.pagedQuery.pageNumber,
                pageSize: castedAction.payload.pagedQuery.pageSize,
                ids: [],
                links: null,
                query: castedAction.payload.pagedQuery.rsqlFilter.toList().build(),
                sort: castedAction.payload.pagedQuery.sort.build()
            });
            newState.localPageTypes[castedAction.payload.packagePath] = PageExtensions.mergeOrAddPage(newState.localPageTypes[castedAction.payload.packagePath], page, 'loading');

            // TODO: Show Morten
            // console.log('GETTING', JSON.stringify(newState.localPageTypes[castedAction.payload.packagePath], undefined, 2));

            return newState;
        }
        case prefix + RecordActionsBase.GET_PAGED_SUCCESS: {
            const castedAction: ReduxAction<GetPagedRecordsSuccessPayload<TRecord, TKey>> = action;
            newState.localPageTypes[castedAction.payload.packagePath] = PageExtensions.mergeOrAddPage(newState.localPageTypes[castedAction.payload.packagePath], castedAction.payload.page);
            newState.localRecords[castedAction.payload.packagePath] = LocalObjectExtensions.mergeOrAddLocal(newState.localRecords[castedAction.payload.packagePath], castedAction.payload.records.map(x => toLocalObject(x)));

            // TODO: Show Morten
            // console.log('FINISHED', JSON.stringify(newState.localPageTypes[castedAction.payload.packagePath], undefined, 2));

            return newState;
        }
        case prefix + RecordActionsBase.GET_PAGED_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Error. Error Action:', castedAction);
            return newState;
        }
        case prefix + RecordActionsBase.GET_SINGLE_SUCCESS: {
            const castedAction: ReduxAction<GetSingleRecordSuccessPayload<TRecord, TKey>> = action;
            newState.localRecords[castedAction.payload.packagePath] = LocalObjectExtensions.mergeOrAddLocal(newState.localRecords[castedAction.payload.packagePath], [toLocalObject(castedAction.payload.record)]);
            return newState;
        }
        case prefix + RecordActionsBase.GET_SINGLE_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Error. Error Action:', castedAction);
            return newState;
        }
        case prefix + RecordActionsBase.ADD: {
            const castedAction: ReduxAction<null, ReduxOfflineMeta<TRecord[], TRecord, TKey>> = action;
            const stateKey = castedAction.meta.offline.commit.meta.stateKey;
            const recordsToBeCreated = castedAction.meta.offline.commit.meta.records;
            newState.localRecords[stateKey] = LocalObjectExtensions.mergeOrAddLocal(newState.localRecords[stateKey], recordsToBeCreated);
            return newState;
        }
        case prefix + RecordActionsBase.ADD_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<TRecord[] | TRecord>, CommitMeta<TRecord, TKey>> = action;
            const body = castedAction.payload.body;
            const newObjects = (Array.isArray(body) ? body : [body]).map((newObject, index) => replaceLocalInnerObject(castedAction.meta.records[index], newObject));
            newState.localRecords[castedAction.meta.stateKey] = LocalObjectExtensions.mergeOrAddLocal<TRecord, TKey>(newState.localRecords[castedAction.meta.stateKey], newObjects);
            return newState;
        }
        case prefix + RecordActionsBase.ADD_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Add error', castedAction);
            return newState;
        }
        case prefix + RecordActionsBase.UPDATE_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<TRecord[] | TRecord>, CommitMeta<TRecord, TKey>> = action;
            const body = castedAction.payload.body;
            const updatedObjects = (Array.isArray(body) ? body : [body]).map((newObject, index) => replaceLocalInnerObject(castedAction.meta.records[index], newObject));
            newState.localRecords[castedAction.meta.stateKey] = LocalObjectExtensions.mergeOrAddLocal<TRecord, TKey>(newState.localRecords[castedAction.meta.stateKey], updatedObjects, LocalObjectStatus.MODIFYING);
            return newState;
        }
        case prefix + RecordActionsBase.UPDATE_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Update error', castedAction);
            return newState;
        }
        case prefix + RecordActionsBase.DELETE_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<TRecord[] | TRecord>, CommitMeta<TRecord, TKey>> = action;
            castedAction.meta.records.forEach(record => {
                delete newState.localRecords[castedAction.meta.stateKey][record.localId];
            });
            return newState;
        }
        case prefix + RecordActionsBase.DELETE_FAILURE: {
            const castedAction: ReduxAction<HttpErrorResponse> = action;
            console.log('Delete error', castedAction);
            return newState;
        }
        default:
            return state;
    }
}
