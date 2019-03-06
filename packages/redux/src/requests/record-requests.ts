import { Observable } from 'rxjs';
import { Record, HttpErrorResponse } from '@skysmack/framework';
import { ReduxAction } from './../action-types/redux-action';
import { GetPagedEntitiesPayload, GetPagedEntitiesSuccessPayload, GetSingleEntityPayload, GetSingleEntitySuccessPayload } from './../payloads';

export interface RecordRequests<TRecord extends Record<TKey>, TKey> {
     getPaged(action: ReduxAction<GetPagedEntitiesPayload>): Observable<ReduxAction<GetPagedEntitiesSuccessPayload<TRecord, TKey>> | ReduxAction<HttpErrorResponse>>;
     getSingle(action: ReduxAction<GetSingleEntityPayload<TKey>>): Observable<ReduxAction<GetSingleEntitySuccessPayload<TRecord, TKey>> | ReduxAction<HttpErrorResponse>>;
}