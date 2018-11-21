import { RecordActionsBase } from "../actions";
import { Record, RecordExtensions, PageExtensions, toLocalObject, HttpSuccessResponse } from "@skysmack/framework";
import { RecordState } from './../states/record-state';
import { GetPagedRecordsSuccessPayload, GetSingleRecordSuccessPayload } from '../payloads';
import { ReduxAction } from '../action-types/redux-action';
import { CommitMeta, ReduxOfflineMeta } from './../metas';

export function recordReducersBase<TState extends RecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(state: TState, action: any, prefix: string = ''): TState {
    state = Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + RecordActionsBase.GET_PAGED_SUCCESS: {
            const castedAction: ReduxAction<GetPagedRecordsSuccessPayload<TRecord, TKey>> = action;
            newState.localPageTypes[castedAction.payload.packagePath] = PageExtensions.mergeOrAddPage(newState.localPageTypes[castedAction.payload.packagePath], castedAction.payload.page);
            newState.localRecords[castedAction.payload.packagePath] = RecordExtensions.mergeOrAddLocalRecords(newState.localRecords[castedAction.payload.packagePath], castedAction.payload.records.map(x => toLocalObject(x)));
            return newState;
        }
        case prefix + RecordActionsBase.GET_SINGLE_SUCCESS: {
            const castedAction: ReduxAction<GetSingleRecordSuccessPayload<TRecord, TKey>> = action;
            newState.localRecords[castedAction.payload.packagePath] = RecordExtensions.mergeOrAddLocalRecords(newState.localRecords[castedAction.payload.packagePath], [toLocalObject(castedAction.payload.record)]);
            return newState;
        }
        case prefix + RecordActionsBase.ADD: {
            const castedAction: ReduxAction<null, ReduxOfflineMeta<TRecord[], TRecord, TKey>> = action;
            const stateKey = castedAction.meta.offline.commit.meta.stateKey;
            const recordsToBeCreated = castedAction.meta.offline.commit.meta.records;
            newState.localRecords[stateKey] = RecordExtensions.mergeOrAddLocalRecords(newState.localRecords[stateKey], recordsToBeCreated);
            return newState;
        }
        case prefix + RecordActionsBase.ADD_SUCCESS: {
            const castedAction: ReduxAction<HttpSuccessResponse<any[] | any>, CommitMeta<TRecord, TKey>> = action;
            const newObjects = (Array.isArray(castedAction.payload.body) ? castedAction.payload.body : [castedAction.payload.body]).map((newObject, index) => toLocalObject(newObject, castedAction.meta.records[index].localId));
            newState.localRecords[castedAction.meta.stateKey] = RecordExtensions.mergeOrAddLocalRecords(newState.localRecords[castedAction.meta.stateKey], newObjects);
            return newState;
        }
        case prefix + RecordActionsBase.ADD_FAILURE: {
            const castedAction: ReduxAction = action;
            console.log('Add error', castedAction);
            return newState;
        }
        default:
            return newState;
    }
}
