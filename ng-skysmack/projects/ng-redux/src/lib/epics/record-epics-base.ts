import { ofType, ActionsObservable, Epic } from 'redux-observable';
import { switchMap, map } from 'rxjs/operators';
import { Record, LocalObject, HttpErrorResponse, QueueItem } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { RecordRequests, ReduxAction, GetPagedRecordsPayload, GetPagedRecordsSuccessPayload, RecordActionsBase, GetSingleRecordPayload, GetSingleRecordSuccessPayload, CommitMeta, QueueActions, CancelActionPayload } from '@skysmack/redux';
import { RecordNotifications } from './../notifications/record-notifications';

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
            this.snackBarGetPagedFailureEpic,
            this.snackBarGetSingleFailureEpic,
            this.snackBarCreateSuccessEpic,
            this.snackBarUpdateSuccessEpic,
            this.snackBarRemoveSuccessEpic,
            this.snackBarCreateFailureEpic,
            this.snackBarUpdateFailureEpic,
            this.snackBarRemoveFailureEpic,
            this.cancelRecordActionEpic
        ];
    }

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

    //#region Notifications
    public snackBarGetPagedFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.GET_PAGED_FAILURE),
        map((action) => {
            if (this.notifications) {
                this.notifications.getPagedError(action);
            }
            return { type: 'NOTIFICATION' };
        }),
    )

    public snackBarGetSingleFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.GET_SINGLE_FAILURE),
        map((action) => {
            if (this.notifications) {
                this.notifications.getSingleError(action);
            }
            return { type: 'NOTIFICATION' };
        }),
    )

    public snackBarCreateSuccessEpic = (action$: ActionsObservable<ReduxAction<unknown, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.ADD_SUCCESS),
        map((action) => {
            if (this.notifications) {
                this.notifications.addSuccess(action);
            }
            return { type: 'NOTIFICATION' };
        }),
    )

    public snackBarCreateFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.ADD_FAILURE),
        map((action) => {
            if (this.notifications) {
                this.notifications.addError(action);
            }
            return { type: 'NOTIFICATION' };
        }),
    )

    public snackBarUpdateSuccessEpic = (action$: ActionsObservable<ReduxAction<unknown, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.UPDATE_SUCCESS),
        map(action => {
            if (this.notifications) {
                this.notifications.updateSuccess(action);
            }
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarUpdateFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.UPDATE_FAILURE),
        map(action => {
            if (this.notifications) {
                this.notifications.updateError(action);
            }
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarRemoveSuccessEpic = (action$: ActionsObservable<ReduxAction<unknown, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.DELETE_SUCCESS),
        map((action) => {
            if (this.notifications) {
                this.notifications.removeSuccess(action);
            }
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarRemoveFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.DELETE_FAILURE),
        map((action) => {
            if (this.notifications) {
                this.notifications.removeError(action);
            }
            return { type: 'NOTIFICATION' };
        })
    )
    //#endregion

    //#region Queue
    public cancelRecordActionEpic = (action$: ActionsObservable<ReduxAction<CancelActionPayload<TRecord, TKey>>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(this.prefix + RecordActionsBase.CANCEL_RECORD_ACTION),
            map(action => ({
                type: QueueActions.REMOVE_QUEUE_ITEMS,
                payload: [
                    new QueueItem({
                        message: ``,
                        messageParams: {},
                        packagePath: action.payload.packagePath,
                        localObject: action.payload.record
                    })
                ]
            }))
        );
    }
    //#endregion
}

