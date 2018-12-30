import { ofType, ActionsObservable, Epic } from 'redux-observable';
import { switchMap, map } from 'rxjs/operators';
import { RecordRequests } from '../requests';
import { Record } from '@skysmack/framework';
import { ReduxAction } from './../action-types/redux-action';
import { RecordActionsBase } from './../actions/record-actions-base';
import { GetPagedRecordsPayload } from './../payloads/get-paged-records-payload';
import { GetSingleRecordPayload } from './../payloads/get-single-record-payload';

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

    public getPagedEpic = (action$: ActionsObservable<ReduxAction<GetPagedRecordsPayload>>) => action$.pipe(
        ofType(this.prefix + RecordActionsBase.GET_PAGED),
        switchMap(action => this.requests.getPaged(action))
    )

    public getSingleEpic = (action$: ActionsObservable<ReduxAction<GetSingleRecordPayload<TKey>>>) => action$.pipe(
        ofType(this.prefix + RecordActionsBase.GET_SINGLE),
        switchMap(action => this.requests.getSingle(action))
    )
}

