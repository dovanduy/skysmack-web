import { Observable } from 'rxjs';
import { GetPagedRecordsAction, GetPagedRecordsFailureAction, GetPagedRecordsSuccessAction, GetSingleRecordAction, GetSingleRecordSuccessAction, GetSingleRecordFailureAction } from '../action-types';
import { Record } from 'skysmack-framework';

export interface RecordRequests<TRecord extends Record<TKey>, TKey> {
     getPaged(action: GetPagedRecordsAction): Observable<GetPagedRecordsSuccessAction<TRecord, TKey> | GetPagedRecordsFailureAction>;
     getSingle(action: GetSingleRecordAction<TKey>): Observable<GetSingleRecordSuccessAction<TRecord, TKey> | GetSingleRecordFailureAction<TKey>>;
}