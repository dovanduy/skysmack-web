import { ofType, ActionsObservable, Epic } from 'redux-observable';
import { switchMap, map } from 'rxjs/operators';
import { Record } from '@skysmack/framework';
import { ReduxAction } from './../action-types/redux-action';
import { RecordActionsBase } from './../actions/record-actions-base';
import { RecordEpicsBase } from './record-epics-base';
import { DocumentRecordRequests } from './../requests/document-record-requests';
import { PackagePathPayload } from './../payloads/package-path-payload';

export abstract class DocumentRecordEpicsBase<TRecord extends Record<TKey>, TKey> extends RecordEpicsBase<TRecord, TKey> {
    public epics: Epic[];
    protected abstract prefix: string;

    constructor(
        protected requests: DocumentRecordRequests<TRecord, TKey>
    ) {
        super(requests);
        this.epics.concat([
            this.getFieldsEpic,
        ]);
    }

    public getFieldsEpic = (action$: ActionsObservable<ReduxAction<PackagePathPayload>>) => action$.pipe(
        ofType(this.prefix + RecordActionsBase.GET_SINGLE),
        switchMap(action => this.requests.getFields(action))
    )
}

