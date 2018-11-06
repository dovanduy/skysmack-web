import { RecordActionsBase } from "../actions";
import { GetPagedRecordsSuccessAction, GetSingleRecordSuccessAction, PackageAction } from "../action-types";
import { Record, LocalObject, RecordExtensions, PageExtensions, StrIndex } from "@skysmack/framework";
import { RecordState } from "../states";
import { OfflineState } from '@redux-offline/redux-offline/lib/types';

export function recordReducersBase<TRecord extends Record<TKey>, TKey>(state: IPackageAppState<RecordState<TRecord, TKey>>, action: PackageAction, prefix: string = ''): IPackageAppState<RecordState<TRecord, TKey>> {
    switch (action.type) {
        case prefix + RecordActionsBase.GET_PAGED_SUCCESS:
            const getPagedEntitiesSuccessAction = action as GetPagedRecordsSuccessAction<TRecord, TKey>;
            const packages = state.packages;
            packages[action.packagePath].localPageTypes = PageExtensions.mergeOrAddPage(state.packages[action.packagePath].localPageTypes, getPagedEntitiesSuccessAction.page);
            packages[action.packagePath].localRecords = RecordExtensions.mergeOrAddLocalRecords(state.packages[action.packagePath].localRecords, getPagedEntitiesSuccessAction.records.map(x => new LocalObject({ object: x })));

            // state.packages[action.packagePath].localRecords = RecordExtensions.mergeOrAddLocalRecords(state.packages[action.packagePath].localRecords, getPagedEntitiesSuccessAction.records.map(x => new LocalObject({ object: x })));
            // state.packages[action.packagePath].localPageTypes = PageExtensions.mergeOrAddPage(state.packages[action.packagePath].localPageTypes, getPagedEntitiesSuccessAction.page);
            state.packages = packages;
            break;

        case prefix + RecordActionsBase.GET_SINGLE_SUCCESS:
            const getSingleEntitySuccessAction = action as GetSingleRecordSuccessAction<TRecord, TKey>;
            var localObject = new LocalObject<TRecord>({ object: getSingleEntitySuccessAction.record });
            state.packages[action.packagePath].localRecords = RecordExtensions.mergeOrAddLocalRecords(state.packages[action.packagePath].localRecords, [localObject]);
            break;

        default:
            break;
    }

    return { ...state };
}

export interface IPackageAppState<IPackageState> extends IAppState {
    // offline?: OfflineState;
    packages?: StrIndex<IPackageState>;
}

export interface IAppState {
    offline?: OfflineState;
    // packages?: StrIndex<StrIndex<RecordState<any, any>>>;
}
