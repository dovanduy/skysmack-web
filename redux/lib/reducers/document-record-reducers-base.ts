import { DocumentRecordActionsBase } from "../actions";
import { Record } from "@skysmack/framework";
import { ReduxAction } from '../action-types/redux-action';
import { PackagePathPayload, GetFieldsSuccessPayload } from './../payloads';
import { PackageDocumentRecordState } from './../states/document-record-state';
import { recordReducersBase } from './record-reducers-base';


export function documentRecordReducersBase<TState extends PackageDocumentRecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(state: TState, action: any, prefix: string = ''): TState {
    state = Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + DocumentRecordActionsBase.GET_FIELDS: {
            const castedAction: ReduxAction<GetFieldsSuccessPayload> = action;
            newState[castedAction.payload.packagePath].fields = castedAction.payload.fields;
            return newState
        }
        case prefix + DocumentRecordActionsBase.GET_FIELDS_FAILURE: {
            const castedAction: ReduxAction<PackagePathPayload> = action;
            console.log('Fields failure...')
            return newState;
        }
        default:
            return {
                ...newState as any,
                ...recordReducersBase(state, action, prefix) as any
            }
    }
}