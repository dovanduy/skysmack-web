import { LocalObjectStatus, Record } from '@skysmack/framework';
import { RecordState } from './../states';
import { ReduxAction } from './../action-types/redux-action';
import { CancelActionMeta } from './../metas/offline-redux/cancel-action-meta';
import { CancelActionPayload } from './../payloads/cancel-action-payload';

export const cancelRecordAction = <TState extends RecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(state: TState, action: ReduxAction<CancelActionPayload<TRecord, TKey>, CancelActionMeta>): TState => {
    const newState = Object.assign({}, state);

    switch (action.payload.record.status) {
        case LocalObjectStatus.CREATING:
            return cancelCreateAction<TState, TRecord, TKey>(newState, action);
        case LocalObjectStatus.MODIFYING:
            return cancelEditAction<TState, TRecord, TKey>(newState, action);
        case LocalObjectStatus.DELETING:
            return cancelDeleteAction<TState, TRecord, TKey>(newState, action);
        default:
            return newState;
    }
};

const cancelCreateAction = <TState extends RecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(newState: TState, action: ReduxAction<CancelActionPayload<TRecord, TKey>, CancelActionMeta>): TState => {
    const packagePath = action.payload.packagePath;
    const record = action.payload.record;
    delete newState.localRecords[packagePath][record.localId];
    return newState;
};

const cancelEditAction = <TState extends RecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(newState: TState, action: ReduxAction<CancelActionPayload<TRecord, TKey>, CancelActionMeta>): TState => {
    const packagePath = action.payload.packagePath;
    const record = action.payload.record;
    newState.localRecords[packagePath][record.localId].object = action.payload.record.oldObject;
    newState.localRecords[packagePath][record.localId].status = LocalObjectStatus.OK;
    return newState;
};

const cancelDeleteAction = <TState extends RecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(newState: TState, action: ReduxAction<CancelActionPayload<TRecord, TKey>, CancelActionMeta>): TState => {
    const packagePath = action.payload.packagePath;
    const record = action.payload.record;
    newState.localRecords[packagePath][record.localId].status = LocalObjectStatus.OK;
    return newState;
};
