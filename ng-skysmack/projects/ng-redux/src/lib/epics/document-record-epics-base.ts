import { ofType, ActionsObservable } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import { Record, LocalObject, FieldSchemaViewModel, HttpResponse, HttpErrorResponse, QueueItem, LocalObjectStatus } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { RecordEpicsBase } from './record-epics-base';
import { DocumentRecordRequests, PackagePathPayload, ReduxAction, GetFieldsSuccessPayload, DocumentRecordActionsBase, CommitMeta, ReduxOfflineMeta, QueueActions, CancelFieldActionPayload } from '@skysmack/redux';
import { DocumentRecordNotifications } from './../notifications/document-record-notifications';

export abstract class DocumentRecordEpicsBase<TRecord extends Record<TKey>, TKey> extends RecordEpicsBase<TRecord, TKey> {
    constructor(
        protected requests: DocumentRecordRequests<TRecord, TKey>,
        protected prefix: string,
        protected notifications: DocumentRecordNotifications<TRecord, TKey>
    ) {
        super(requests, prefix, notifications);
        this.epics = this.epics.concat([
            this.getFieldsEpic,
            this.getSingleFieldEpic,
            this.getAvailableFieldsEpic,
            this.snackBarGetFieldsFailureEpic,
            this.snackBarGetSingleFieldFailureEpic,
            this.snackBarGetAvailableFieldsFailureEpic,
            this.snackBarFieldCreateSuccessEpic,
            this.snackBarFieldUpdateSuccessEpic,
            this.snackBarFieldRemoveSuccessEpic,
            this.snackBarFieldCreateFailureEpic,
            this.snackBarFieldUpdateFailureEpic,
            this.snackBarFieldRemoveFailureEpic,
            this.standardFieldActionEpic,
            this.successFieldActionEpic,
            this.failureFieldActionEpic,
            this.cancelFieldActionEpic
        ]);
    }

    public getFieldsEpic = (action$: ActionsObservable<ReduxAction<PackagePathPayload>>): Observable<ReduxAction<GetFieldsSuccessPayload> | ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.GET_FIELDS),
        mergeMap(action => this.requests.getFields(action))
    )

    public getSingleFieldEpic = (action$: ActionsObservable<ReduxAction<PackagePathPayload>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.GET_SINGLE_FIELD),
        mergeMap(action => this.requests.getSingleField(action))
    )

    public getAvailableFieldsEpic = (action$: ActionsObservable<ReduxAction<PackagePathPayload>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.GET_AVAILABLE_FIELDS),
        mergeMap(action => this.requests.getAvailableFields(action))
    )

    //#region Notifications
    public snackBarGetFieldsFailureEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.GET_FIELDS_FAILURE),
        map((action) => {
            this.notifications.getFieldsError(action);
            return { type: 'NOTIFICATION' };
        }),
    )

    public snackBarGetSingleFieldFailureEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.GET_SINGLE_FAILURE),
        map((action) => {
            this.notifications.getSingleFieldError(action);
            return { type: 'NOTIFICATION' };
        }),
    )

    public snackBarGetAvailableFieldsFailureEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.GET_AVAILABLE_FIELDS_FAILURE),
        map((action) => {
            this.notifications.getAvailableFieldsFailure(action);
            return { type: 'NOTIFICATION' };
        }),
    )

    public snackBarFieldCreateSuccessEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.ADD_FIELD_SUCCESS),
        map((action) => {
            this.notifications.addFieldSuccess(action);
            return { type: 'NOTIFICATION' };
        }),
    )

    public snackBarFieldCreateFailureEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.ADD_FIELD_FAILURE),
        map((action) => {
            this.notifications.addFieldError(action);
            return { type: 'NOTIFICATION' };
        }),
    )

    public snackBarFieldUpdateSuccessEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.UPDATE_FIELD_SUCCESS),
        map(action => {
            this.notifications.updateFieldSuccess(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarFieldUpdateFailureEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.UPDATE_FIELD_FAILURE),
        map(action => {
            this.notifications.updateFieldError(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarFieldRemoveSuccessEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.DELETE_FIELD_SUCCESS),
        map((action) => {
            this.notifications.removeFieldSuccess(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarFieldRemoveFailureEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.DELETE_FIELD_FAILURE),
        map((action) => {
            this.notifications.removeFieldError(action);
            return { type: 'NOTIFICATION' };
        })
    )
    //#endregion

    //#region Queue
    public standardFieldActionEpic = (action$: ActionsObservable<ReduxAction<any, ReduxOfflineMeta<TRecord[], HttpResponse, LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(
                this.prefix + DocumentRecordActionsBase.ADD_FIELD,
                this.prefix + DocumentRecordActionsBase.UPDATE_FIELD,
                this.prefix + DocumentRecordActionsBase.DELETE_FIELD,
            ),
            map(action => ({
                type: QueueActions.SET_QUEUE_ITEMS,
                payload: action.meta.offline.commit.meta.queueItems
            }))
        );
    }

    public successFieldActionEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(
                this.prefix + DocumentRecordActionsBase.ADD_FIELD_SUCCESS,
                this.prefix + DocumentRecordActionsBase.UPDATE_FIELD_SUCCESS,
                this.prefix + DocumentRecordActionsBase.DELETE_FIELD_SUCCESS,
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

    public failureFieldActionEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<TRecord, TKey>[]>>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(
                this.prefix + DocumentRecordActionsBase.ADD_FIELD_FAILURE,
                this.prefix + DocumentRecordActionsBase.UPDATE_FIELD_FAILURE,
                this.prefix + DocumentRecordActionsBase.DELETE_FIELD_FAILURE,
            ),
            map(action => {
                return ({
                    type: QueueActions.SET_QUEUE_ITEMS,
                    payload: action.meta.queueItems.map(queueItems => {
                        queueItems.message = `${this.prefix.replace('_', '.')}QUEUE.ERROR`;
                        queueItems.localObject.error = true;
                        queueItems.error = action.payload;
                        return queueItems;
                    })
                });
            })
        );
    }

    public cancelFieldActionEpic = (action$: ActionsObservable<ReduxAction<CancelFieldActionPayload<FieldSchemaViewModel>>>): Observable<ReduxAction<QueueItem[]>> => {
        return action$.pipe(
            ofType(this.prefix + DocumentRecordActionsBase.CANCEL_FIELD_ACTION),
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
