import { LocalObjectStatus, Record, FieldSchemaViewModel, LocalObject } from '@skysmack/framework';
import { DocumentRecordState } from './../states';
import { ReduxAction } from './../action-types/redux-action';
import { CancelActionMeta } from './../metas/offline-redux/cancel-action-meta';
import { CancelFieldActionPayload } from '../payloads/cancel-field-action-payload';
import { ReduxOfflineMeta } from '../metas/offline-redux/redux-offline-meta';

export const cancelFieldActionOutboxFilter = (outbox, action: ReduxAction<CancelFieldActionPayload<LocalObject<FieldSchemaViewModel, string>>, CancelActionMeta>) => {
    return outbox
        .filter((item: ReduxAction<any, ReduxOfflineMeta<any[], any, any>>) => (item && item.meta && item.meta.offline && item.meta.offline.commit && item.meta.offline.commit.meta) ? true : false)
        .filter((item: ReduxAction<any, ReduxOfflineMeta<any[], any, any>>) => item.meta.offline.commit.meta.value.find(field => field.localId === action.payload.field.localId ? false : true));
};

export const cancelFieldAction = <TState extends DocumentRecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(state: TState, action: ReduxAction<CancelFieldActionPayload<FieldSchemaViewModel>, CancelActionMeta>): TState => {
    const newState = Object.assign({}, state);

    switch (action.payload.field.status) {
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

const cancelCreateAction = <TState extends DocumentRecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(newState: TState, action: ReduxAction<CancelFieldActionPayload<FieldSchemaViewModel>, CancelActionMeta>): TState => {
    const packagePath = action.payload.packagePath;
    const field = action.payload.field;
    delete newState.fields[packagePath][field.localId];
    return newState;
};

const cancelEditAction = <TState extends DocumentRecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(newState: TState, action: ReduxAction<CancelFieldActionPayload<FieldSchemaViewModel>, CancelActionMeta>): TState => {
    const packagePath = action.payload.packagePath;
    const field = action.payload.field;
    newState.fields[packagePath][field.localId].object = action.payload.field.oldObject;
    newState.fields[packagePath][field.localId].status = LocalObjectStatus.OK;
    newState.fields[packagePath][field.localId].error = false;
    return newState;
};

const cancelDeleteAction = <TState extends DocumentRecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(newState: TState, action: ReduxAction<CancelFieldActionPayload<FieldSchemaViewModel>, CancelActionMeta>): TState => {
    const packagePath = action.payload.packagePath;
    const field = action.payload.field;
    newState.fields[packagePath][field.localId].status = LocalObjectStatus.OK;
    newState.fields[packagePath][field.localId].error = false;
    return newState;
};
