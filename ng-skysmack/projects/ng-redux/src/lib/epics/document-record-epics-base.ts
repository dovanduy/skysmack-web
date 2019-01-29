import { ofType, ActionsObservable } from 'redux-observable';
import { switchMap, map } from 'rxjs/operators';
import { Record, LocalObject, FieldSchemaViewModel } from '@skysmack/framework';
import { Observable } from 'rxjs';
import { RecordEpicsBase } from './record-epics-base';
import { DocumentRecordRequests, PackagePathPayload, ReduxAction, GetFieldsSuccessPayload, DocumentRecordActionsBase, CommitMeta } from '@skysmack/redux';
import { DocumentRecordNotifications } from './../notifications/document-record-notifications';

export abstract class DocumentRecordEpicsBase<TRecord extends Record<TKey>, TKey> extends RecordEpicsBase<TRecord, TKey> {
    constructor(
        protected requests: DocumentRecordRequests<TRecord, TKey>,
        protected prefix: string,
        protected notifications?: DocumentRecordNotifications<TRecord, TKey>
    ) {
        super(requests, prefix);
        this.epics = this.epics.concat([
            this.getFieldsEpic,
            this.getSingleFieldEpic,
            this.getAvailableFieldsEpic,
            this.snackBarGetFieldsFailureEpic,
            this.snackBarGetSingleFieldFailureEpic,
            this.snackBarFieldCreateSuccessEpic,
            this.snackBarFieldUpdateSuccessEpic,
            this.snackBarFieldRemoveSuccessEpic,
            this.snackBarFieldCreateFailureEpic,
            this.snackBarFieldUpdateFailureEpic,
            this.snackBarFieldRemoveFailureEpic
        ]);
    }

    public getFieldsEpic = (action$: ActionsObservable<ReduxAction<PackagePathPayload>>): Observable<ReduxAction<GetFieldsSuccessPayload> | ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.GET_FIELDS),
        switchMap(action => this.requests.getFields(action))
    )

    public getSingleFieldEpic = (action$: ActionsObservable<ReduxAction<PackagePathPayload>>) => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.GET_SINGLE_FIELD),
        switchMap(action => this.requests.getSingleField(action))
    )

    public getAvailableFieldsEpic = (action$: ActionsObservable<ReduxAction<PackagePathPayload>>) => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.GET_AVAILABLE_FIELDS),
        switchMap(action => this.requests.getAvailableFields(action))
    )

    // NOTIFICATIONS

    // GET
    public snackBarGetFieldsFailureEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.GET_FIELDS_FAILURE),
        map((action) => {
            if (this.notifications) {
                this.notifications.getFieldsError(action);
            }
            return { type: 'NOTIFICATION' };
        }),
    )

    public snackBarGetSingleFieldFailureEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.GET_SINGLE_FAILURE),
        map((action) => {
            if (this.notifications) {
                this.notifications.getSingleFieldError(action);
            }
            return { type: 'NOTIFICATION' };
        }),
    )

    // ADD
    public snackBarFieldCreateSuccessEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.ADD_FIELD_SUCCESS),
        map((action) => {
            if (this.notifications) {
                this.notifications.addFieldSuccess(action);
            }
            return { type: 'NOTIFICATION' };
        }),
    )

    public snackBarFieldCreateFailureEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.ADD_FIELD_FAILURE),
        map((action) => {
            if (this.notifications) {
                this.notifications.addFieldError(action);
            }
            return { type: 'NOTIFICATION' };
        }),
    )

    // UPDATE
    public snackBarFieldUpdateSuccessEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.UPDATE_FIELD_SUCCESS),
        map(action => {
            if (this.notifications) {
                this.notifications.updateFieldSuccess(action);
            }
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarFieldUpdateFailureEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.UPDATE_FIELD_FAILURE),
        map(action => {
            if (this.notifications) {
                this.notifications.updateFieldError(action);
            }
            return { type: 'NOTIFICATION' };
        })
    )

    // DELETE
    public snackBarFieldRemoveSuccessEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.DELETE_FIELD_SUCCESS),
        map((action) => {
            if (this.notifications) {
                this.notifications.removeFieldSuccess(action);
            }
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarFieldRemoveFailureEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.DELETE_FIELD_FAILURE),
        map((action) => {
            if (this.notifications) {
                this.notifications.removeFieldError(action);
            }
            return { type: 'NOTIFICATION' };
        })
    )
}
