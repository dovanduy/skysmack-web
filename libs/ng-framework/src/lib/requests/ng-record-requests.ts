import { Record, ApiDomain, HttpErrorResponse } from '@skysmack/framework';
import { RecordRequests, RecordActionsBase, ReduxAction, GetPagedEntitiesPayload, GetPagedEntitiesSuccessPayload, GetSingleEntityPayload, GetSingleEntitySuccessPayload } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { map, retry, catchError, retryWhen, concatMap, delay } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from './custom-http-url-encoding-codec';
import { PageResponseExtensions } from './page-response-extensions';
import { of } from 'rxjs';

export abstract class NgRecordRequests<TRecord extends Record<TKey>, TKey> implements RecordRequests<TRecord, TKey> {
    protected retryTimes = 3;
    protected identifier = 'id';

    constructor(
        protected http: HttpClient,
        protected apiDomain: ApiDomain,
        protected prefix: string,
        protected additionalPaths: string[]
    ) { }

    public getPaged(action: ReduxAction<GetPagedEntitiesPayload>): Observable<ReduxAction<GetPagedEntitiesSuccessPayload<TRecord, TKey>> | ReduxAction<HttpErrorResponse>> {
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
                    return Object.assign({}, new ReduxAction<GetPagedEntitiesSuccessPayload<TRecord, TKey>>({
                        type: this.prefix + RecordActionsBase.GET_PAGED_SUCCESS,
                        payload: {
                            entities: httpResponse.body ? httpResponse.body : [],
                            packagePath: action.payload.packagePath,
                            page: PageResponseExtensions.getPageResponse<TKey>(httpResponse.headers, httpResponse.body.map(record => record[this.identifier]), query, sort),
                            pagedQuery: action.payload.pagedQuery
                        }
                    }));
                }),
                retry(this.retryTimes),
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                    type: this.prefix + RecordActionsBase.GET_PAGED_FAILURE,
                    payload: error,
                    error: true
                }))))
            );
    }

    public getSingle(action: ReduxAction<GetSingleEntityPayload<TKey>>): Observable<ReduxAction<GetSingleEntitySuccessPayload<TRecord, TKey>> | ReduxAction<HttpErrorResponse>> {
        let url = `${this.apiDomain.domain}/${action.payload.packagePath}`;
        url = this.addAdditionalPaths(url);
        url = `${url}/${action.payload.id}`;

        return this.http.get<TRecord>(url, { observe: 'response' })
            .pipe(
                map(httpResponse => {
                    return Object.assign({}, new ReduxAction<GetSingleEntitySuccessPayload<TRecord, TKey>>({
                        type: this.prefix + RecordActionsBase.GET_SINGLE_SUCCESS,
                        payload: {
                            id: action.payload.id,
                            entity: httpResponse.body,
                            packagePath: action.payload.packagePath
                        }
                    }));
                }),
                retry(this.retryTimes),
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
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
