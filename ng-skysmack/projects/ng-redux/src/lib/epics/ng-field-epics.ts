import { ofType, ActionsObservable, Epic } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { LocalObject, FieldSchemaViewModel, HttpResponse, HttpErrorResponse, QueueItem } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { PackagePathPayload, ReduxAction, FieldActionsBase, CommitMeta, ReduxOfflineMeta, QueueActions, CancelDynamicFieldActionPayload, GetPagedRecordsPayload, GetPagedRecordsSuccessPayload, GetSingleRecordSuccessPayload, GetSingleRecordPayload } from '@skysmack/redux';
import { NgFieldRequests } from '../requests/ng-field-requests';
import { Injectable } from '@angular/core';
import { NgFieldNotifications } from '../notifications/ng-field-notifications';

@Injectable({ providedIn: 'root' })
export class NgFieldEpics {
    public epics: Epic[];

    constructor(
        protected requests: NgFieldRequests,
        protected notifications: NgFieldNotifications
    ) {
        this.epics = [
            this.getPagedEpic,
            this.getSingleEpic,
            this.getAvailableFieldsEpic,
            this.snackBarGetAvailableFieldsFailureEpic,
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
            this.cancelFieldActionEpic
        ];
    }

    public getPagedEpic = (action$: ActionsObservable<ReduxAction<GetPagedRecordsPayload>>): Observable<ReduxAction<GetPagedRecordsSuccessPayload<any, string>> | ReduxAction<GetPagedRecordsPayload>> => {
        return action$.pipe(
            ofType(FieldActionsBase.FIELD_GET_PAGED),
            mergeMap(action => this.requests.getPaged(action as any)),
        );
    }

    public getSingleEpic = (action$: ActionsObservable<ReduxAction<GetSingleRecordPayload<string>>>): Observable<ReduxAction<GetSingleRecordSuccessPayload<any, string>> | ReduxAction<GetSingleRecordPayload<string>>> => {
        return action$.pipe(
            ofType(FieldActionsBase.FIELD_GET_SINGLE),
            mergeMap(action => this.requests.getSingle(action))
        );
    }

    public getAvailableFieldsEpic = (action$: ActionsObservable<ReduxAction<PackagePathPayload>>): Observable<ReduxAction> => action$.pipe(
        ofType(FieldActionsBase.FIELD_GET_AVAILABLE_FIELDS),
        mergeMap(action => this.requests.getAvailableFields(action))
    )

    //#region Notifications
    public snackBarGetPagedFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<any, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(FieldActionsBase.FIELD_GET_PAGED_FAILURE),
        map((action) => {
            this.notifications.getPagedError(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarGetSingleFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<any, string>>>>): Observable<ReduxAction> => action$.pipe(
        ofType(FieldActionsBase.FIELD_GET_SINGLE_FAILURE),
        map((action) => {
            this.notifications.getSingleError(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarGetAvailableFieldsFailureEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>>>>): Observable<ReduxAction> => action$.pipe(
        ofType(FieldActionsBase.FIELD_GET_AVAILABLE_FIELDS_FAILURE),
        map((action) => {
            this.notifications.getAvailableFieldsFailure(action);
            return { type: 'NOTIFICATION' };
        }),
    )

    public snackBarCreateSuccessEpic = (action$: ActionsObservable<ReduxAction<unknown, CommitMeta<LocalObject<any, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(FieldActionsBase.FIELD_ADD_SUCCESS),
        map((action) => {
            this.notifications.addSuccess(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarCreateFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<any, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(FieldActionsBase.FIELD_ADD_FAILURE),
        map((action) => {
            this.notifications.addError(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarUpdateSuccessEpic = (action$: ActionsObservable<ReduxAction<unknown, CommitMeta<LocalObject<any, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(FieldActionsBase.FIELD_UPDATE_SUCCESS),
        map(action => {
            this.notifications.updateSuccess(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarUpdateFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<any, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(FieldActionsBase.FIELD_UPDATE_FAILURE),
        map(action => {
            this.notifications.updateError(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarRemoveSuccessEpic = (action$: ActionsObservable<ReduxAction<unknown, CommitMeta<LocalObject<any, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(FieldActionsBase.FIELD_DELETE_SUCCESS),
        map((action) => {
            this.notifications.removeSuccess(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarRemoveFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<any, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(FieldActionsBase.FIELD_DELETE_FAILURE),
        map((action) => {
            this.notifications.removeError(action);
            return { type: 'NOTIFICATION' };
        })
    )
    //#endregion

    //#region Queue
    public standardActionEpic = (action$: ActionsObservable<ReduxAction<any, ReduxOfflineMeta<any[], HttpResponse, LocalObject<any, string>[]>>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(
                FieldActionsBase.FIELD_ADD,
                FieldActionsBase.FIELD_UPDATE,
                FieldActionsBase.FIELD_DELETE,
            ),
            map(action => ({
                type: QueueActions.SET_QUEUE_ITEMS,
                payload: action.meta.offline.commit.meta.queueItems
            }))
        );
    }

    public successActionEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<any, string>[]>>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(
                FieldActionsBase.FIELD_ADD_SUCCESS,
                FieldActionsBase.FIELD_UPDATE_SUCCESS,
                FieldActionsBase.FIELD_DELETE_SUCCESS,
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

    public failureActionEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<any, string>[]>>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(
                FieldActionsBase.FIELD_ADD_FAILURE,
                FieldActionsBase.FIELD_UPDATE_FAILURE,
                FieldActionsBase.FIELD_DELETE_FAILURE,
            ),
            map(action => ({
                type: QueueActions.SET_QUEUE_ITEMS,
                payload: action.meta.queueItems.map(queueItems => {
                    queueItems.message = `FIELD.QUEUE.ERROR`;
                    queueItems.localObject.error = true;
                    queueItems.error = action.payload;
                    return queueItems;
                })
            }))
        );
    }

    public cancelFieldActionEpic = (action$: ActionsObservable<ReduxAction<CancelDynamicFieldActionPayload<FieldSchemaViewModel>>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(FieldActionsBase.CANCEL_DYNAMIC_FIELD_ACTION),
            map(action => ({
                type: QueueActions.REMOVE_QUEUE_ITEMS,
                payload: [
                    new QueueItem({
                        message: ``,
                        packagePath: action.payload.packagePath,
                        localObject: action.payload.field
                    })
                ]
            }))
        );
    }
    //#endregion

}
