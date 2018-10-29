import { RecordActionsBase } from "../actions";
import { GetPagedRecordsSuccessAction, GetSingleRecordSuccessAction, PackageAction } from "../action-types";
import { Record, LocalObject, RecordExtensions, PageExtensions } from "skysmack-framework";
import { RecordState } from "../states";

export function recordReducersBase<TRecord extends Record<TKey>, TKey>(state: RecordState<TRecord, TKey>, action: PackageAction, prefix: string = ''): RecordState<TRecord, TKey> {   
    switch (action.type) {
        case prefix + RecordActionsBase.GET_PAGED_SUCCESS:
            const getPagedEntitiesSuccessAction = action as GetPagedRecordsSuccessAction<TRecord, TKey>;
            state.localRecords[getPagedEntitiesSuccessAction.packagePath] = RecordExtensions.mergeOrAddLocalRecords(state.localRecords[getPagedEntitiesSuccessAction.packagePath], getPagedEntitiesSuccessAction.records
                .map(x => new LocalObject({ object: x })));
            state.localPageTypes[getPagedEntitiesSuccessAction.packagePath] = PageExtensions.mergeOrAddPage(state.localPageTypes[getPagedEntitiesSuccessAction.packagePath], getPagedEntitiesSuccessAction.page);
            break;

        case prefix + RecordActionsBase.GET_SINGLE_SUCCESS:
            const getSingleEntitySuccessAction = action as GetSingleRecordSuccessAction<TRecord, TKey>;
            var localObject = new LocalObject<TRecord>({ object: getSingleEntitySuccessAction.Record });
            state.localRecords[getSingleEntitySuccessAction.packagePath] = RecordExtensions.mergeOrAddLocalRecords(state.localRecords[getSingleEntitySuccessAction.packagePath], [ localObject ]);
            break;

        default:
            break;
    }

    return { ...state };
}
