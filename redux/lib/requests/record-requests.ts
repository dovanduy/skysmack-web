import { Observable } from 'rxjs';
import { Record } from '@skysmack/framework';
import { ReduxAction } from './../action-types/redux-action';
import { GetPagedRecordsPayload, GetPagedRecordsSuccessPayload, GetSingleRecordPayload, GetSingleRecordSuccessPayload } from './../payloads';

export interface RecordRequests<TRecord extends Record<TKey>, TKey> {
     getPaged(action: ReduxAction<GetPagedRecordsPayload>): Observable<ReduxAction<GetPagedRecordsSuccessPayload<TRecord, TKey>> | ReduxAction<GetPagedRecordsPayload>>;
     getSingle(action: ReduxAction<GetSingleRecordPayload<TKey>>): Observable<ReduxAction<GetSingleRecordSuccessPayload<TRecord, TKey>> | ReduxAction<GetSingleRecordPayload<TKey>>>;
}