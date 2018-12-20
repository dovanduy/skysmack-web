import { Observable } from 'rxjs';
import { Record } from '@skysmack/framework';
import { ReduxAction } from './../action-types/redux-action';
import { RecordRequests } from './record-requests';
import { PackagePathPayload, GetSingleFieldSuccessPayload, GetAvailableFieldsSuccessPayload, GetFieldsSuccessPayload } from './../payloads';

export interface DocumentRecordRequests<TRecord extends Record<TKey>, TKey> extends RecordRequests<TRecord, TKey> {
    getFields(action: ReduxAction<PackagePathPayload>): Observable<ReduxAction<GetFieldsSuccessPayload> | ReduxAction>;
    getSingleField(action: ReduxAction<PackagePathPayload>): Observable<ReduxAction<GetSingleFieldSuccessPayload> | ReduxAction>;
    getAvailableFields(action: ReduxAction<PackagePathPayload>): Observable<ReduxAction<GetAvailableFieldsSuccessPayload>>
}
