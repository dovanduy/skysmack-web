import { ofType, ActionsObservable } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { Record } from '@skysmack/framework';
import { ReduxAction } from './../action-types/redux-action';
import { RecordEpicsBase } from './record-epics-base';
import { DocumentRecordRequests } from './../requests/document-record-requests';
import { PackagePathPayload } from './../payloads/package-path-payload';
import { DocumentRecordActionsBase } from '../actions';

export abstract class DocumentRecordEpicsBase<TRecord extends Record<TKey>, TKey> extends RecordEpicsBase<TRecord, TKey> {
    constructor(
        protected requests: DocumentRecordRequests<TRecord, TKey>,
        protected prefix: string
    ) {
        super(requests, prefix);
        this.epics = this.epics.concat([
            this.getFieldsEpic,
            this.getSingleFieldEpic,
            this.getAvailableFieldsEpic
        ]);
    }

    public getFieldsEpic = (action$: ActionsObservable<ReduxAction<PackagePathPayload>>) => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.GET_FIELDS),
        switchMap(action => this.requests.getFields(action))
    )

    public getSingleFieldEpic = (action$: ActionsObservable<ReduxAction<PackagePathPayload>>) => action$.pipe(
        ofType(this.prefix + DocumentRecordActionsBase.GET_SINGLE_FIELD),
        switchMap(action => this.requests.getSingleField(action))
    )

    public getAvailableFieldsEpic = (action$: ActionsObservable<ReduxAction<PackagePathPayload>>) => action$.pipe(
        ofType(DocumentRecordActionsBase.GET_AVAILABLE_FIELDS),
        switchMap(action => this.requests.getAvailableFields(action))
    )
}

