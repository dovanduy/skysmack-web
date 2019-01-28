import { ofType, ActionsObservable, Epic } from 'redux-observable';
import { switchMap, map } from 'rxjs/operators';
import { Record, LocalObject } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { RecordRequests, ReduxAction, GetPagedRecordsPayload, GetPagedRecordsSuccessPayload, RecordActionsBase, GetSingleRecordPayload, GetSingleRecordSuccessPayload, CommitMeta } from '@skysmack/redux';
import { RecordNotifications } from '../notifications';

export abstract class RecordEpicsBase<TRecord extends Record<TKey>, TKey> {
    public epics: Epic[];

    constructor(
        protected requests: RecordRequests<TRecord, TKey>,
        protected prefix: string,
        protected notifications?: RecordNotifications<TRecord, TKey>
    ) {
        this.epics = [
            this.getPagedEpic,
            this.getSingleEpic,
            this.testEpic,
            this.snackBarCreateSuccessEpic,
            this.snackBarUpdateSuccessEpic,
            this.snackBarRemoveSuccessEpic,
            this.snackBarCreateFailureEpic,
            this.snackBarUpdateFailureEpic,
            this.snackBarRemoveFailureEpic
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

    // Notifications

    // TODO: ADD REC GET FAILURE NOTIFICATION

    public snackBarCreateSuccessEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.ADD_SUCCESS),
        map((action) => {
            if (this.notifications) {
                this.notifications.addSuccess(action.meta.value);
            }
            return { type: 'NOTIFICATION' };
        }),
    )
    public snackBarCreateFailureEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.ADD_FAILURE),
        map((action) => {
            if (this.notifications) {
                this.notifications.addError(action.payload);
            }
            return { type: 'NOTIFICATION' };
        }),
    )

    public snackBarUpdateSuccessEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.UPDATE_SUCCESS),
        map(action => {
            if (this.notifications) {
                this.notifications.updateSuccess(action.meta.value);
            }
            return { type: 'NOTIFICATION' };
        })
    )
    public snackBarUpdateFailureEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.UPDATE_FAILURE),
        map(action => {
            if (this.notifications) {
                this.notifications.updateError(action.payload);
            }
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarRemoveSuccessEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.DELETE_SUCCESS),
        map((action) => {
            if (this.notifications) {
                this.notifications.removeSuccess(action.meta.value);
            }
            return { type: 'NOTIFICATION' };
        })
    )
    public snackBarRemoveFailureEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.DELETE_FAILURE),
        map((action) => {
            if (this.notifications) {
                this.notifications.removeError(action.payload);
            }
            return { type: 'NOTIFICATION' };
        })
    )
}

