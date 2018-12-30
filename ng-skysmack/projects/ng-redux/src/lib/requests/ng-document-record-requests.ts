import { Record, ApiDomain, FieldSchemaViewModel, FieldValueProviderViewModel } from '@skysmack/framework';
import { ReduxAction, PackagePathPayload, GetFieldsSuccessPayload, DocumentRecordActionsBase, GetSingleFieldSuccessPayload, GetAvailableFieldsSuccessPayload, } from '@skysmack/redux';
import { Observable, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { NgRecordRequests } from './ng-record-requests';
import { DocumentRecordRequests } from '@skysmack/redux/lib/requests/document-record-requests';

export abstract class NgDocmentRecordRequests<TRecord extends Record<TKey>, TKey> extends NgRecordRequests<TRecord, TKey> implements DocumentRecordRequests<TRecord, TKey> {

    constructor(
        protected http: HttpClient,
        protected apiDomain: ApiDomain,
        protected prefix: string,
        protected additionalPaths: string[]
    ) {
        super(http, apiDomain, prefix, additionalPaths);
    }

    public getFields(action: ReduxAction<PackagePathPayload>): Observable<ReduxAction<GetFieldsSuccessPayload> | ReduxAction> {
        let url = `${this.apiDomain.domain}/${action.payload.packagePath}`;
        url = this.additionalPaths ? [url, ...this.additionalPaths].join('/') : url;
        url = `${url}/fields`;

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
                catchError((error) => of(Object.assign({}, new ReduxAction({
                    type: this.prefix + DocumentRecordActionsBase.GET_FIELDS_FAILURE,
                    payload: error,
                    error: true
                }))))
            );
    }

    public getSingleField(action: ReduxAction<PackagePathPayload>): Observable<ReduxAction<GetSingleFieldSuccessPayload>> {
        const url = `${this.apiDomain.domain}/${action.payload}/fields`;
        return this.http.get<FieldSchemaViewModel>(url, { observe: 'response' }).pipe(
            map(httpResponse => Object.assign({}, new ReduxAction<GetSingleFieldSuccessPayload>({
                type: this.prefix + DocumentRecordActionsBase.GET_SINGLE_FIELD_SUCCESS,
                payload: {
                    field: httpResponse.body,
                    packagePath: action.payload.packagePath
                }
            }))),
            catchError((error) => of(Object.assign({}, new ReduxAction({
                type: DocumentRecordActionsBase.GET_SINGLE_FIELD_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }

    public getAvailableFields(action: ReduxAction<PackagePathPayload>): Observable<ReduxAction<GetAvailableFieldsSuccessPayload>> {
        const url = this.apiDomain.domain + `/${action.payload.packagePath}/fields-available`;
        return this.http.get<FieldValueProviderViewModel[]>(url, { observe: 'response' }).pipe(
            map(httpResponse => Object.assign({}, new ReduxAction<GetAvailableFieldsSuccessPayload>({
                type: this.prefix + DocumentRecordActionsBase.GET_AVAILABLE_FIELDS_SUCCESS,
                payload: {
                    availableFields: httpResponse.body ? httpResponse.body : [],
                    packagePath: action.payload.packagePath
                }
            }))),
            catchError((error) => of(Object.assign({}, new ReduxAction({
                type: this.prefix + DocumentRecordActionsBase.GET_AVAILABLE_FIELDS_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }
}
