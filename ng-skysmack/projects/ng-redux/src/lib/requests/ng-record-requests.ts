import { Record, ApiDomain } from '@skysmack/framework';
import { RecordRequests, RecordActionsBase, ReduxAction, GetPagedRecordsPayload, GetPagedRecordsSuccessPayload, GetSingleRecordPayload, GetSingleRecordSuccessPayload } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { map, retry, catchError, share } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from './custom-http-url-encoding-codec';
import { PageResponseExtensions } from './page-response-extensions';
import { of } from 'rxjs';

export abstract class NgRecordRequests<TRecord extends Record<TKey>, TKey> implements RecordRequests<TRecord, TKey> {
    protected retryTimes = 3;
    protected epics: any;

    constructor(
        protected http: HttpClient,
        protected apiDomain: ApiDomain,
        protected prefix: string,
        protected additionalPaths: string[]
    ) {
    }

    public getPaged(action: ReduxAction<GetPagedRecordsPayload>): Observable<ReduxAction<GetPagedRecordsSuccessPayload<TRecord, TKey>> | ReduxAction<GetPagedRecordsPayload>> {
        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        let query = '';
        let sort = '';

        if (action.payload.pagedQuery.rsqlFilter) {
            query = action.payload.pagedQuery.rsqlFilter.toList().build();
            if (query && query.length > 0) {
                queryParameters = queryParameters.set('query', query);
            }
        }

        if (action.payload.pagedQuery.sort) {
            sort = action.payload.pagedQuery.sort.build();
            if (sort && sort.length > 0) {
                queryParameters = queryParameters.set('sort', sort);
            }
        }

        if (action.payload.pagedQuery.pageNumber && action.payload.pagedQuery.pageNumber > 1) {
            queryParameters = queryParameters.set('pageNumber', action.payload.pagedQuery.pageNumber.toString());
        }

        if (action.payload.pagedQuery.pageSize && action.payload.pagedQuery.pageSize > 0) {
            queryParameters = queryParameters.set('pageSize', action.payload.pagedQuery.pageSize.toString());
        }

        let url = `${this.apiDomain.domain}/${action.payload.packagePath}`;
        url = this.addAdditionalPaths(url);

        return this.http.get<TRecord[]>(url, { observe: 'response', params: queryParameters })
            .pipe(
                map(httpResponse => {
                    return Object.assign({}, new ReduxAction<GetPagedRecordsSuccessPayload<TRecord, TKey>>({
                        type: this.prefix + RecordActionsBase.GET_PAGED_SUCCESS,
                        payload: {
                            records: httpResponse.body ? httpResponse.body : [],
                            packagePath: action.payload.packagePath,
                            page: PageResponseExtensions.getPageResponse<TKey>(httpResponse.headers, httpResponse.body.map(record => record.id), query, sort),
                            pagedQuery: action.payload.pagedQuery
                        }
                    }));
                }),
                retry(this.retryTimes),
                catchError((error) => of(Object.assign({}, new ReduxAction<GetPagedRecordsPayload>({
                    type: this.prefix + RecordActionsBase.GET_PAGED_FAILURE,
                    payload: error,
                    error: true
                }))))
            );
    }

    public getSingle(action: ReduxAction<GetSingleRecordPayload<TKey>>): Observable<ReduxAction<GetSingleRecordSuccessPayload<TRecord, TKey>> | ReduxAction<GetSingleRecordPayload<TKey>>> {
        let url = `${this.apiDomain.domain}/${action.payload.packagePath}`;
        url = this.addAdditionalPaths(url);
        url = `${url}/${action.payload.id}`;

        return this.http.get<TRecord>(url, { observe: 'response' })
            .pipe(
                map(httpResponse => {
                    return Object.assign({}, new ReduxAction<GetSingleRecordSuccessPayload<TRecord, TKey>>({
                        type: this.prefix + RecordActionsBase.GET_SINGLE_SUCCESS,
                        payload: {
                            id: action.payload.id,
                            record: httpResponse.body,
                            packagePath: action.payload.packagePath
                        }
                    }));
                }),
                retry(this.retryTimes),
                catchError((error) => of(Object.assign({}, new ReduxAction<GetSingleRecordPayload<TKey>>({
                    type: this.prefix + RecordActionsBase.GET_SINGLE_FAILURE,
                    payload: error,
                    error: true
                }))))
            );
    }

    protected addAdditionalPaths(url: string) {
        return this.additionalPaths ? [url, ...this.additionalPaths].join('/') : url;
    }

    protected appendValues<T>(url, values: T[], prefix: string = '?ids=', seperator: string = ','): string {
        return url + prefix + values.join(seperator);
    }
}
