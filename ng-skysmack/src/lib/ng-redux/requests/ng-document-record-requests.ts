import { Record, ApiDomain, FieldSchemaViewModel } from '@skysmack/framework';
import { ReduxAction, PackagePathPayload, GetFieldsSuccessPayload, DocumentRecordActionsBase, } from '@skysmack/redux';
import { Observable } from 'rxjs/internal/Observable';
import { map, retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { NgRecordRequests } from './ng-record-requests';
import { DocumentRecordRequests } from '@skysmack/redux/lib/requests/document-record-requests';

export abstract class NgDocmentRecordRequests<TRecord extends Record<TKey>, TKey> extends NgRecordRequests<TRecord, TKey> implements DocumentRecordRequests<TRecord, TKey> {

    constructor(
        protected http: HttpClient,
        protected apiDomain: ApiDomain,
        protected prefix: string
    ) {
        super(http, apiDomain, prefix);
    }

    public getFields(action: ReduxAction<PackagePathPayload>): Observable<ReduxAction<GetFieldsSuccessPayload> | ReduxAction> {
        const url = `${this.apiDomain.domain}/${action.payload.packagePath}/fields`;

        return this.http.get<FieldSchemaViewModel[]>(url, { observe: 'response' })
            .pipe(
                map(httpResponse => {
                    return Object.assign({}, new ReduxAction<GetFieldsSuccessPayload>({
                        type: this.prefix + DocumentRecordActionsBase.GET_FIELDS_SUCCESS,
                        payload: {
                            fields: httpResponse.body ? httpResponse.body : [],
                            packagePath: action.payload.packagePath,
                        }
                    }));
                }),
                retry(this.retryTimes),
                catchError(() => of(Object.assign({}, new ReduxAction({
                    error: true
                }))))
            );
    }
}