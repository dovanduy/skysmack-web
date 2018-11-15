import { ofType, ActionsObservable, Epic } from 'redux-observable';
import { switchMap, map } from 'rxjs/operators';
import { GetPagedRecordsAction, GetPagedRecordsSuccessAction, GetPagedRecordsFailureAction, GetSingleRecordAction, GetSingleRecordFailureAction, GetSingleRecordSuccessAction } from '../action-types';
import { RecordActionsBase } from '../actions';
import { RecordRequests } from '../requests';
import { Record } from '@skysmack/framework';

export abstract class RecordEpicsBase<TRecord extends Record<TKey>, TKey> {
    public epics: Epic[];
    protected abstract prefix: string;

    constructor(
        protected requests: RecordRequests<TRecord, TKey>
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

    public getPagedEpic = (action$: ActionsObservable<GetPagedRecordsSuccessAction<TRecord, TKey> | GetPagedRecordsFailureAction>) => action$.pipe(
        ofType(this.prefix + RecordActionsBase.GET_PAGED),
        switchMap((action: GetPagedRecordsAction) => this.requests.getPaged(action))
    )

    public getSingleEpic = (action$: ActionsObservable<GetSingleRecordSuccessAction<TRecord, TKey> | GetSingleRecordFailureAction<TKey>>) => action$.pipe(
        ofType(this.prefix + RecordActionsBase.GET_SINGLE),
        switchMap((action: GetSingleRecordAction<TKey>) => this.requests.getSingle(action))
    )
}

