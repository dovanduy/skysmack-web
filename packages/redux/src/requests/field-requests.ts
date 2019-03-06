import { Observable } from 'rxjs';
import { ReduxAction } from './../action-types/redux-action';
import { PackagePathPayload, GetAvailableFieldsSuccessPayload, GetPagedEntitiesPayload, GetPagedEntitiesSuccessPayload, GetSingleEntityPayload, GetSingleEntitySuccessPayload } from './../payloads';
import { HttpErrorResponse, FieldSchemaViewModel } from '@skysmack/framework';
import { AdditionalPathsMeta } from '../metas/additional-paths-meta';

export interface FieldRequests {
    getPaged(action: ReduxAction<GetPagedEntitiesPayload, AdditionalPathsMeta>): Observable<ReduxAction<GetPagedEntitiesSuccessPayload<FieldSchemaViewModel, string>> | ReduxAction<HttpErrorResponse>>;
    getSingle(action: ReduxAction<PackagePathPayload, AdditionalPathsMeta>): Observable<ReduxAction<GetSingleEntitySuccessPayload<FieldSchemaViewModel, string>> | ReduxAction<HttpErrorResponse>>;
    getAvailableFields(action: ReduxAction<PackagePathPayload, AdditionalPathsMeta>): Observable<ReduxAction<GetAvailableFieldsSuccessPayload> | ReduxAction<HttpErrorResponse>>;
}
