import { Observable } from 'rxjs';
import { Record } from '@skysmack/framework';
import { ReduxAction } from './../action-types/redux-action';
import { RecordRequests } from './record-requests';
import { PackagePathPayload } from './../payloads';
import { GetFieldsSuccessPayload } from './../payloads/get-fields-succes-payload';

export interface DocumentRecordRequests<TRecord extends Record<TKey>, TKey> extends RecordRequests<TRecord, TKey> {
    getFields(action: ReduxAction<PackagePathPayload>): Observable<ReduxAction<GetFieldsSuccessPayload> | ReduxAction>;
}