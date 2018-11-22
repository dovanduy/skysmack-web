import { LocalObjectStatus, Record } from '@skysmack/framework';
import { RecordState } from './../states';
import { ReduxAction } from './../action-types/redux-action';
import { CancelActionMeta } from './../metas/offline-redux/cancel-action-meta';
import { CancelActionPayload } from './../payloads/cancel-action-payload';

export const cancelRecordAction = <TState extends RecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(state: TState, action: ReduxAction<CancelActionPayload<TRecord, TKey>, CancelActionMeta>): TState => {
    const newState = Object.assign({}, state);

    switch (action.payload.record.status) {
        case LocalObjectStatus.CREATING:
            return cancelCreateAction(newState, action);
        case LocalObjectStatus.MODIFYING:
            return cancelEditAction(newState, action);
        case LocalObjectStatus.DELETING:
            return cancelDeleteAction(newState, action);
        default:
            return newState;
    }
};

const cancelCreateAction = <TState extends RecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(newState: TState, action: ReduxAction<CancelActionPayload<TRecord, TKey>, CancelActionMeta>): TState => {
    const packagePath = action.payload.packagePath;
    const record = action.payload.record;
    delete newState.localRecords[packagePath][record.localId];

    // if (options.area.subAreaKey) {
    //     let targetArray = newState[options.getAreaString()][options.area.key][options.area.subAreaKey][options.target][options.path];
    //     targetArray = ArrayHelpers.pluckArrayImmutable(targetArray, record);
    // } else {
    //     let targetArray = newState[options.getAreaString()][options.area.key][options.target][options.path];
    //     targetArray = ArrayHelpers.pluckArrayImmutable(targetArray, record);
    // }

    return newState;
};

const cancelEditAction = <TState extends RecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(newState: TState, action: ReduxAction<CancelActionPayload<TRecord, TKey>, CancelActionMeta>): TState => {
    // if (options.area.subAreaKey) {
    //     const entities = newState[options.getAreaString()][options.area.key][options.area.subAreaKey][options.target][options.path];
    //     const updateItem = entities.find(item => item.localId === record.localId);
    //     if (updateItem) {
    //         updateItem.status = LocalObjectStatus.OK;
    //         updateItem.object = record.oldValue;
    //     }
    // } else {
    //     const entities = newState[options.getAreaString()][options.area.key][options.target][options.path];
    //     const updateItem = entities.find(item => item.localId === record.localId);
    //     if (updateItem) {
    //         updateItem.status = LocalObjectStatus.OK;
    //         updateItem.object = record.oldValue;
    //     }
    // }

    return newState;
};

const cancelDeleteAction = <TState extends RecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(newState: TState, action: ReduxAction<CancelActionPayload<TRecord, TKey>, CancelActionMeta>): TState => {
    // if (options.area.subAreaKey) {
    //     const entities = newState[options.getAreaString()][options.area.key][options.area.subAreaKey][options.target][options.path];
    //     const updateItem = entities.find(item => item.localId === record.localId);
    //     if (updateItem) {
    //         updateItem.status = LocalObjectStatus.OK;
    //     }
    // } else {
    //     const entities = newState[options.getAreaString()][options.area.key][options.target][options.path];
    //     const updateItem = entities.find(item => item.localId === record.localId);
    //     if (updateItem) {
    //         updateItem.status = LocalObjectStatus.OK;
    //     }
    // }
    return newState;
};
