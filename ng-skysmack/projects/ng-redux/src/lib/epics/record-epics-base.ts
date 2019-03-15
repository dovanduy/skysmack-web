import { ofType, ActionsObservable, Epic } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { Record, LocalObject, HttpErrorResponse, QueueItem, HttpResponse, log } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { RecordRequests, ReduxAction, GetPagedEntitiesPayload, GetPagedEntitiesSuccessPayload, RecordActionsBase, GetSingleEntityPayload, GetSingleEntitySuccessPayload, CommitMeta, QueueActions, CancelActionPayload, ReduxOfflineMeta } from '@skysmack/redux';
import { RecordNotifications } from './../notifications/record-notifications';

export abstract class RecordEpicsBase<TRecord extends Record<TKey>, TKey> {
    public epics: Epic[];
    private NOTIFICATIONS = 'NOTIFICATION';

    constructor(
        protected requests: RecordRequests<TRecord, TKey>,
        protected prefix: string,
        protected notifications: RecordNotifications<TRecord, TKey>
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
            this.standardActionEpic,
            this.successActionEpic,
            this.failureActionEpic,
            this.cancelRecordActionEpic
        ];
    }

    public getPagedEpic = (action$: ActionsObservable<ReduxAction<GetPagedEntitiesPayload>>): Observable<ReduxAction<GetPagedEntitiesSuccessPayload<TRecord, TKey>> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(this.prefix + RecordActionsBase.GET_PAGED),
            mergeMap(action => this.requests.getPaged(action as any)),
        );
    }

    public getSingleEpic = (action$: ActionsObservable<ReduxAction<GetSingleEntityPayload<TKey>>>): Observable<ReduxAction<GetSingleEntitySuccessPayload<TRecord, TKey>> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(this.prefix + RecordActionsBase.GET_SINGLE),
            mergeMap(action => this.requests.getSingle(action))
        );
    }

    //#region Notifications
    public snackBarGetPagedFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.GET_PAGED_FAILURE),
        map((action) => {
            this.notifications.getPagedError(action);
            return { type: this.NOTIFICATIONS };
        })
    )

    public snackBarGetSingleFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.GET_SINGLE_FAILURE),
        map((action) => {
            this.notifications.getSingleError(action);
            return { type: this.NOTIFICATIONS };
        })
    )

    public snackBarCreateSuccessEpic = (action$: ActionsObservable<ReduxAction<unknown, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.ADD_SUCCESS),
        map((action) => {
            this.notifications.addSuccess(action);
            return { type: this.NOTIFICATIONS };
        })
    )

    public snackBarCreateFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.ADD_FAILURE),
        map((action) => {
            this.notifications.addError(action);
            return { type: this.NOTIFICATIONS };
        })
    )

    public snackBarUpdateSuccessEpic = (action$: ActionsObservable<ReduxAction<unknown, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.UPDATE_SUCCESS),
        map(action => {
            this.notifications.updateSuccess(action);
            return { type: this.NOTIFICATIONS };
        })
    )

    public snackBarUpdateFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.UPDATE_FAILURE),
        map(action => {
            this.notifications.updateError(action);
            return { type: this.NOTIFICATIONS };
        })
    )

    public snackBarRemoveSuccessEpic = (action$: ActionsObservable<ReduxAction<unknown, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.DELETE_SUCCESS),
        map((action) => {
            this.notifications.removeSuccess(action);
            return { type: this.NOTIFICATIONS };
        })
    )

    public snackBarRemoveFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + RecordActionsBase.DELETE_FAILURE),
        map((action) => {
            this.notifications.removeError(action);
            return { type: this.NOTIFICATIONS };
        })
    )
    //#endregion

    //#region Queue
    public standardActionEpic = (action$: ActionsObservable<ReduxAction<any, ReduxOfflineMeta<TRecord[], HttpResponse, LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(
                this.prefix + RecordActionsBase.ADD,
                this.prefix + RecordActionsBase.UPDATE,
                this.prefix + RecordActionsBase.DELETE,
            ),
            map(action => ({
                type: QueueActions.SET_QUEUE_ITEMS,
                payload: action.meta.offline.commit.meta.queueItems
            }))
        );
    }

    public successActionEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(
                this.prefix + RecordActionsBase.ADD_SUCCESS,
                this.prefix + RecordActionsBase.UPDATE_SUCCESS,
                this.prefix + RecordActionsBase.DELETE_SUCCESS,
            ),
            map(action => ({
                type: QueueActions.REMOVE_QUEUE_ITEMS,
                payload: action.meta.value.map(record => {
                    return new QueueItem({
                        message: ``,
                        packagePath: action.meta.stateKey,
                        localObject: record,
                    });
                })
            }))
        );
    }

    public failureActionEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction<QueueItem[]>> => {
        const withQueue = this.prefix + 'QUEUE';
        return action$.pipe(
            ofType(
                this.prefix + RecordActionsBase.ADD_FAILURE,
                this.prefix + RecordActionsBase.UPDATE_FAILURE,
                this.prefix + RecordActionsBase.DELETE_FAILURE,
            ),
            map(action => ({
                type: QueueActions.SET_QUEUE_ITEMS,
                payload: action.meta.queueItems.map(queueItems => {
                    queueItems.message = `${withQueue.replace('_QUEUE', '.QUEUE')}.ERROR`;
                    queueItems.localObject.error = true;
                    queueItems.error = action.payload;
                    return queueItems;
                })
            }))
        );
    }

    public cancelRecordActionEpic = (action$: ActionsObservable<ReduxAction<CancelActionPayload<TRecord, TKey>>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(this.prefix + RecordActionsBase.CANCEL_RECORD_ACTION),
            map(action => ({
                type: QueueActions.REMOVE_QUEUE_ITEMS,
                payload: [
                    new QueueItem({
                        message: ``,
                        packagePath: action.payload.packagePath,
                        localObject: action.payload.record
                    })
                ]
            }))
        );
    }
    //#endregion
}
