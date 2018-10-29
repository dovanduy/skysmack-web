import { Record, LocalObject, PageResponse } from "skysmack-framework";
import { RecordRequests, GetPagedRecordsAction, GetPagedRecordsSuccessAction, GetPagedRecordsFailureAction, GetSingleRecordAction, GetSingleRecordSuccessAction, GetSingleRecordFailureAction } from "skysmack-redux";
import { Observable } from 'rxjs/internal/Observable';
import { map, retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from "./custom-http-url-encoding-codec";
import { PageResponseExtensions } from "./page-response-extensions";

export abstract class NgRecordRequests<TRecord extends Record<TKey>, TKey> implements RecordRequests<TRecord, TKey> {
    protected retryTimes = 3;
    protected epics: any;
    protected abstract prefix: string;

    constructor(
        protected http: HttpClient
    ) {
    }

    public getPaged(action: GetPagedRecordsAction): Observable<GetPagedRecordsSuccessAction<TRecord, TKey> | GetPagedRecordsFailureAction> {
        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });

        if (action.pagedQuery.rsqlFilter) {
            const query = action.pagedQuery.rsqlFilter.toList().build();
            if (query && query.length > 0) {
                queryParameters = queryParameters.set('query', query);
            }
        }

        if (action.pagedQuery.sort) {
            const sort = action.pagedQuery.sort.build();
            if (sort && sort.length > 0) {
                queryParameters = queryParameters.set('sort', sort);
            }
        }

        if (action.pagedQuery.pageNumber && action.pagedQuery.pageNumber > 1) {
            queryParameters = queryParameters.set('pageNumber', action.pagedQuery.pageNumber.toString());
        }

        if (action.pagedQuery.pageSize && action.pagedQuery.pageSize > 0) {
            queryParameters = queryParameters.set('pageSize', action.pagedQuery.pageSize.toString());
        }

        return this.http.get<TRecord[]>(`${action.packagePath}`, { observe: 'response', params: queryParameters })
            .pipe(
                map(httpResponse => {
                    if (httpResponse.body) {
                        return new GetPagedRecordsSuccessAction<TRecord, TKey>({
                            records: httpResponse.body,
                            page: PageResponseExtensions.getPageResponse<TKey>(httpResponse.headers, httpResponse.body.map(record => record.Id))
                        });
                    }
                    return new GetPagedRecordsSuccessAction<TRecord, TKey>();
                }),
                retry(this.retryTimes),
                catchError<GetPagedRecordsSuccessAction<TRecord, TKey>, GetPagedRecordsFailureAction>(error => {
                    return new GetPagedRecordsFailureAction({
                        ...action,
                        error: error
                    });
                })
            );
    }

    public getSingle(action: GetSingleRecordAction<TKey>): Observable<GetSingleRecordSuccessAction<TRecord, TKey> | GetSingleRecordFailureAction<TKey>> {
        return this.http.get<TRecord>(`${action.packagePath}`, { observe: 'response' })
        .pipe(
            map(httpResponse => {
                if (httpResponse.body) {
                    return new GetSingleRecordSuccessAction<TRecord, TKey>({
                        record: httpResponse.body
                    });
                }
                return new GetSingleRecordSuccessAction<TRecord, TKey>();
            }),
            retry(this.retryTimes),
            catchError<GetSingleRecordSuccessAction<TRecord, TKey>, GetSingleRecordFailureAction<TKey>>(error => {
                return new GetSingleRecordFailureAction<TKey>({
                    ...action,
                    error: error
                });
            })
        );
    }
}