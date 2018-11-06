import { combineEpics, ofType, ActionsObservable } from 'redux-observable';
import { switchMap, map } from 'rxjs/operators';
import { GetPagedRecordsAction, GetPagedRecordsSuccessAction, GetPagedRecordsFailureAction, GetSingleRecordAction, GetSingleRecordFailureAction, GetSingleRecordSuccessAction } from '../action-types';
import { RecordActionsBase } from '../actions';
import { RecordRequests } from '../requests';
import { Record } from '@skysmack/framework';

export abstract class RecordEpicsBase<TRecord extends Record<TKey>, TKey> {
    protected epics: any;
    protected abstract prefix: string;

    constructor(
        protected requests: RecordRequests<TRecord, TKey>
    ) {
        this.epics = combineEpics(
            this.getPagedEpic,
            this.getSingleEpic
        );
    }

    public getEpics = () => this.epics;


    public test = (action$) => action$.pipe(
        ofType('TEST'),
        map((action) => ({ type: 'TEST_SUCCESS' }))
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

