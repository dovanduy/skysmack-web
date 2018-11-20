import { RecordActionsBase } from "../actions";
import { Record, RecordExtensions, PageExtensions, toLocalObject } from "@skysmack/framework";
import { RecordState } from './../states/record-state';
import { GetPagedRecordsSuccessPayload, GetSingleRecordSuccessPayload } from '../payloads';
import { ReduxAction } from '../action-types/redux-action';

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
        default:
            return newState;
    }
}