import { Observable } from 'rxjs';
import { ReduxAction } from './../action-types/redux-action';
import { PackagePathPayload, GetSingleFieldSuccessPayload, GetAvailableFieldsSuccessPayload, GetPagedRecordsPayload, GetPagedRecordsSuccessPayload } from './../payloads';

export interface FieldRequests {
    getPaged(action: ReduxAction<GetPagedRecordsPayload>, additionalPaths?: string[]): Observable<ReduxAction<GetPagedRecordsSuccessPayload<any, string>> | ReduxAction<GetPagedRecordsPayload>>;
    getSingle(action: ReduxAction<PackagePathPayload>, additionalPaths?: string[]): Observable<ReduxAction<GetSingleFieldSuccessPayload> | ReduxAction>;
    getAvailableFields(action: ReduxAction<PackagePathPayload>, additionalPaths?: string[]): Observable<ReduxAction<GetAvailableFieldsSuccessPayload>>
}
