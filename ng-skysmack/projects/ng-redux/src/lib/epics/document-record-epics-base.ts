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
            this.snackBarFieldCreateSuccessEpic,
            this.snackBarFieldUpdateSuccessEpic,
            this.snackBarFieldRemoveSuccessEpic
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


    public snackBarFieldCreateSuccessEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.ADD_FIELD_SUCCESS),
        map((action) => {
            if (this.notifications) {
                this.notifications.addFieldSuccess(action.meta.value);
            }
            return { type: 'NOTIFICATION' };
        }),
    )

    public snackBarFieldUpdateSuccessEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.UPDATE_FIELD_SUCCESS),
        map(action => {
            if (this.notifications) {
                this.notifications.updateFieldSuccess(action.meta.value);
            }
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarFieldRemoveSuccessEpic = (action$: ActionsObservable<ReduxAction<any, CommitMeta<LocalObject<FieldSchemaViewModel, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.DELETE_FIELD_SUCCESS),
        map((action) => {
            if (this.notifications) {
                this.notifications.removeFieldSuccess(action.meta.value);
            }
            return { type: 'NOTIFICATION' };
        })
    )
}
