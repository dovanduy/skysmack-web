import { LocalObjectStatus, FieldSchemaViewModel, LocalObject, CancelActionMeta } from '@skysmack/framework';
import { ReduxAction } from './../action-types/redux-action';
import { CancelFieldActionPayload } from '../payloads/cancel-field-action-payload';
import { ReduxOfflineMeta } from '../metas/offline-redux/redux-offline-meta';
import { FieldState } from './field-reducer';

export const cancelFieldActionOutboxFilter = (outbox, action: ReduxAction<CancelFieldActionPayload<LocalObject<FieldSchemaViewModel, string>>, CancelActionMeta>) => {
    return outbox
        .filter((item: ReduxAction<any, ReduxOfflineMeta<any[], any, any>>) => (item && item.meta && item.meta.offline && item.meta.offline.commit && item.meta.offline.commit.meta) ? true : false)
        .filter((item: ReduxAction<any, ReduxOfflineMeta<any[], any, any>>) => item.meta.offline.commit.meta.value.find(field => field.localId === action.payload.record.localId ? false : true));
};

export const cancelFieldAction = (state: FieldState, action: ReduxAction<CancelFieldActionPayload<FieldSchemaViewModel>, CancelActionMeta>): FieldState => {
    const newState = Object.assign({}, state);

    switch (action.payload.record.status) {
        case LocalObjectStatus.CREATING:
            return cancelFieldCreateAction(newState, action);
        case LocalObjectStatus.MODIFYING:
            return cancelFieldEditAction(newState, action);
        case LocalObjectStatus.DELETING:
            return cancelFieldDeleteAction(newState, action);
        default:
            return newState;
    }
};

const cancelFieldCreateAction = (newState: FieldState, action: ReduxAction<CancelFieldActionPayload<FieldSchemaViewModel>, CancelActionMeta>): FieldState => {
    const packagePath = action.payload.packagePath;
    const field = action.payload.record;
    delete newState.localRecords[packagePath][field.localId];
    return newState;
};

const cancelFieldEditAction = (newState: FieldState, action: ReduxAction<CancelFieldActionPayload<FieldSchemaViewModel>, CancelActionMeta>): FieldState => {
    const packagePath = action.payload.packagePath;
    const field = action.payload.record;
    newState.localRecords[packagePath][field.localId].object = action.payload.record.oldObject;
    newState.localRecords[packagePath][field.localId].status = LocalObjectStatus.OK;
    newState.localRecords[packagePath][field.localId].error = false;
    return newState;
};

const cancelFieldDeleteAction = (newState: FieldState, action: ReduxAction<CancelFieldActionPayload<FieldSchemaViewModel>, CancelActionMeta>): FieldState => {
    const packagePath = action.payload.packagePath;
    const field = action.payload.record;
    newState.localRecords[packagePath][field.localId].status = LocalObjectStatus.OK;
    newState.localRecords[packagePath][field.localId].error = false;
    return newState;
};
