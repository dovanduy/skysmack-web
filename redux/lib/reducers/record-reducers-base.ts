import { RecordActionsBase } from "../actions";
import { GetPagedRecordsSuccessAction, PackageAction, GetSingleRecordSuccessAction } from "../action-types";
import { Record, RecordExtensions, PageExtensions, toLocalObject, StrIndex } from "@skysmack/framework";
import { PackageRecordState, RecordState } from './../states/record-state';


export function recordReducersBase<TState extends PackageRecordState<TRecord, TKey>, TRecord extends Record<TKey>, TKey>(state: TState, action: PackageAction, prefix: string = ''): TState {
    state = Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case prefix + RecordActionsBase.GET_PAGED_SUCCESS:
            newState = initPackageState(newState, action.packagePath);
            const gpsAction = action as GetPagedRecordsSuccessAction<TRecord, TKey>;
            newState[action.packagePath].localPageTypes = PageExtensions.mergeOrAddPage(newState[action.packagePath].localPageTypes, gpsAction.page);
            newState[action.packagePath].localRecords = RecordExtensions.mergeOrAddLocalRecords(newState[action.packagePath].localRecords, gpsAction.records.map(x => toLocalObject(x)));
            return newState;

        case prefix + RecordActionsBase.GET_SINGLE_SUCCESS:
            const gsrsAction = action as GetSingleRecordSuccessAction<TRecord, TKey>;
            newState[action.packagePath].localRecords = RecordExtensions.mergeOrAddLocalRecords(newState[action.packagePath].localRecords, [toLocalObject(gsrsAction.record)]);
            return newState;

        default:
            return newState;
    }
}

function initPackageState<TState, TRecord extends Record<TKey>, TKey>(newState: TState, packagePath: string): TState {
    if (!newState[packagePath] || newState[packagePath] === null) {
        newState[packagePath] = {
            localPageTypes: {},
            localRecords: {}
        } as RecordState<TRecord, TKey>;
        return newState
    } else {
        return newState;
    }
}