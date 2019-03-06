import { Observable } from 'rxjs';
import { ReduxAction } from './../action-types/redux-action';
import { PackagePathPayload, GetAvailableFieldsSuccessPayload, GetPagedEntitiesPayload, GetPagedEntitiesSuccessPayload, GetSingleEntityPayload, GetSingleEntitySuccessPayload } from './../payloads';
import { HttpErrorResponse, FieldSchemaViewModel } from '@skysmack/framework';

export interface FieldRequests {
    getPaged(action: ReduxAction<GetPagedEntitiesPayload>, additionalPaths?: string[]): Observable<ReduxAction<GetPagedEntitiesSuccessPayload<FieldSchemaViewModel, string>> | ReduxAction<HttpErrorResponse>>;
    getSingle(action: ReduxAction<PackagePathPayload>, additionalPaths?: string[]): Observable<ReduxAction<GetSingleEntitySuccessPayload<FieldSchemaViewModel, string>> | ReduxAction<HttpErrorResponse>>;
    getAvailableFields(action: ReduxAction<PackagePathPayload>, additionalPaths?: string[]): Observable<ReduxAction<GetAvailableFieldsSuccessPayload> | ReduxAction<HttpErrorResponse>>;
}
