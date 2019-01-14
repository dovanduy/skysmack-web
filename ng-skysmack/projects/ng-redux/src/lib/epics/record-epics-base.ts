import { ofType, ActionsObservable, Epic } from 'redux-observable';
import { switchMap, map } from 'rxjs/operators';
import { Record } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { RecordRequests, ReduxAction, GetPagedRecordsPayload, GetPagedRecordsSuccessPayload, RecordActionsBase, GetSingleRecordPayload, GetSingleRecordSuccessPayload } from '@skysmack/redux';

export abstract class RecordEpicsBase<TRecord extends Record<TKey>, TKey> {
    public epics: Epic[];

    constructor(
        protected requests: RecordRequests<TRecord, TKey>,
        protected prefix: string
    ) {
        this.epics = [
            this.getPagedEpic,
            this.getSingleEpic,
            this.testEpic
        ];
    }

    public testEpic = (action$: ActionsObservable<any>) => action$.pipe(
        ofType(this.prefix + 'TEST'),
        map(() => ({ type: this.prefix + 'TEST_SUCCEED' }))
    )

    public getPagedEpic = (action$: ActionsObservable<ReduxAction<GetPagedRecordsPayload>>): Observable<ReduxAction<GetPagedRecordsSuccessPayload<TRecord, TKey>> | ReduxAction<GetPagedRecordsPayload>> => {
        return action$.pipe(
            ofType(this.prefix + RecordActionsBase.GET_PAGED),
            switchMap(action => this.requests.getPaged(action))
        );
    }

    public getSingleEpic = (action$: ActionsObservable<ReduxAction<GetSingleRecordPayload<TKey>>>): Observable<ReduxAction<GetSingleRecordSuccessPayload<TRecord, TKey>> | ReduxAction<GetSingleRecordPayload<TKey>>> => {
        return action$.pipe(
            ofType(this.prefix + RecordActionsBase.GET_SINGLE),
            switchMap(action => this.requests.getSingle(action))
        );
    }
}

