import { LocalObjectStatus, Record, FieldSchemaViewModel, LocalObject } from '@skysmack/framework';
import { DocumentRecordState } from './../states';
import { ReduxAction } from './../action-types/redux-action';
import { CancelActionMeta } from './../metas/offline-redux/cancel-action-meta';
import { CancelDynamicFieldActionPayload } from '../payloads/cancel-dynamic-field-action-payload';

export const cancelDynamicFieldActionOutboxFilter = (outbox, action: ReduxAction<CancelDynamicFieldActionPayload<LocalObject<FieldSchemaViewModel, string>>, CancelActionMeta>) => {
    return outbox
        .filter((item: ReduxAction<any, any>) => (item && item.meta && item.meta.offline && item.meta.offline.commit && item.meta.offline.commit.meta) ? true : false)
        .filter((item: ReduxAction<any, any>) => item.meta.offline.commit.meta.fields.find(field => field.localId === action.payload.field.localId ? false : true));
};

export const cancelDynamicFieldAction = <TState extends DocumentRecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(state: TState, action: ReduxAction<CancelDynamicFieldActionPayload<FieldSchemaViewModel>, CancelActionMeta>): TState => {
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

const cancelCreateAction = <TState extends DocumentRecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(newState: TState, action: ReduxAction<CancelDynamicFieldActionPayload<FieldSchemaViewModel>, CancelActionMeta>): TState => {
    console.log('create');
    const packagePath = action.payload.packagePath;
    const field = action.payload.field;
    delete newState.fields[packagePath][field.localId];
    return newState;
};

const cancelEditAction = <TState extends DocumentRecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(newState: TState, action: ReduxAction<CancelDynamicFieldActionPayload<FieldSchemaViewModel>, CancelActionMeta>): TState => {
    console.log('edit');
    const packagePath = action.payload.packagePath;
    const field = action.payload.field;
    newState.fields[packagePath][field.localId].object = action.payload.field.oldObject;
    newState.fields[packagePath][field.localId].status = LocalObjectStatus.OK;
    return newState;
};

const cancelDeleteAction = <TState extends DocumentRecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(newState: TState, action: ReduxAction<CancelDynamicFieldActionPayload<FieldSchemaViewModel>, CancelActionMeta>): TState => {
    console.log('delete');
    const packagePath = action.payload.packagePath;
    const field = action.payload.field;
    newState.fields[packagePath][field.localId].status = LocalObjectStatus.OK;
    return newState;
};
