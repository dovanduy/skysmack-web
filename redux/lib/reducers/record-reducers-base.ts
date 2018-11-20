import { RecordActionsBase } from "../actions";
import { Record, RecordExtensions, PageExtensions, toLocalObject } from "@skysmack/framework";
import { PackageRecordState } from './../states/record-state';
import { GetPagedRecordsSuccessPayload, GetSingleRecordSuccessPayload } from '../payloads';
import { ReduxAction } from '../action-types/redux-action';
import { DocumentRecordState } from '../states/document-record-state';


export function recordReducersBase<TState extends PackageRecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(state: TState, action: any, prefix: string = ''): TState {
    state = Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + RecordActionsBase.GET_PAGED_SUCCESS: {
            const castedAction: ReduxAction<GetPagedRecordsSuccessPayload<TRecord, TKey>> = action;
            newState = initPackageState(newState, castedAction.payload.packagePath);
            newState[castedAction.payload.packagePath].localPageTypes = PageExtensions.mergeOrAddPage(newState[castedAction.payload.packagePath].localPageTypes, castedAction.payload.page);
            newState[castedAction.payload.packagePath].localRecords = RecordExtensions.mergeOrAddLocalRecords(newState[castedAction.payload.packagePath].localRecords, castedAction.payload.records.map(x => toLocalObject(x)));
            return newState;
        }
        case prefix + RecordActionsBase.GET_SINGLE_SUCCESS: {
            const castedAction: ReduxAction<GetSingleRecordSuccessPayload<TRecord, TKey>> = action;
            newState[castedAction.payload.packagePath].localRecords = RecordExtensions.mergeOrAddLocalRecords(newState[castedAction.payload.packagePath].localRecords, [toLocalObject(castedAction.payload.record)]);
            return newState;
        }
        default:
            return newState;
    }
}

function initPackageState<TState, TRecord extends Record<TKey>, TKey>(newState: TState, packagePath: string): TState {
    if (!newState[packagePath] || newState[packagePath] === null) {
        newState[packagePath] = {
            localPageTypes: {},
            localRecords: {},
            fields: [],
            availableFields: []
        } as DocumentRecordState<TRecord, TKey>;
        return newState
    }
    {
        return newState;
    }
}
