import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, HttpErrorResponse, GlobalProperties, HttpSuccessResponse } from '@skysmack/framework';
import { ReduxAction } from '@skysmack/redux';
import { Observable, of } from 'rxjs';
import { map, retry, catchError, share } from 'rxjs/operators';
import { NgFileStorageActions } from './ng-file-storage-actions';
import { FILE_STORAGE_REDUX_KEY, Bucket } from '@skysmack/packages-file-storage';

@Injectable({ providedIn: 'root' })
export class NgFileStorageRequests {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) { }

    public getFolderWithFiles(request: { prefix, delimiter, includeTrailingDelimiter, pageSize, pageNumber }): Observable<HttpSuccessResponse | HttpErrorResponse> {
        // ${ }
        // http://client1.skysmack-io.test:2000/storage?pageSize=10&pageNumber=1&delimiter=%2F&includeTrailingDelimiter=true
        const url = `${this.apiDomain.domain}/storage?pageSize=${request.pageSize}&pageNumber=${request.pageNumber}&prefix=${request.prefix}&delimiter=${request.delimiter}&includeTrailingDelimiter=${request.includeTrailingDelimiter}`;

        return this.http.get<any>(url, { observe: 'response' })
            .pipe(
                map(httpResponse => httpResponse),
                share(),
                catchError((error) => of(error))
            );
    }

    public getBuckets(action: ReduxAction<any>): Observable<ReduxAction<{ packagePath: string, bucket: Bucket } | HttpErrorResponse>> {
        const url = `${this.apiDomain.domain}/${action.payload.packagePath}/settings/storage`;

        return this.http.get<any>(url, { observe: 'response' })
            .pipe(
                map(httpResponse => {
                    return Object.assign({}, new ReduxAction<any, any>({
                        type: FILE_STORAGE_REDUX_KEY + NgFileStorageActions.GET_BUCKET_SUCCESS,
                        payload: {
                            packagePath: action.payload.packagePath,
                            bucket: httpResponse.body
                        }
                    }));
                }),
                retry(3),
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse, any>({
                    type: FILE_STORAGE_REDUX_KEY + NgFileStorageActions.GET_BUCKET_FAILURE,
                    payload: error,
                    error: true
                }))))
            );
    }

    public updateBuckets(action: ReduxAction<{ packagePath: string, bucket: Bucket }>): Observable<ReduxAction<{ packagePath: string, bucket: Bucket } | HttpErrorResponse>> {
        const url = `${this.apiDomain.domain}/${action.payload.packagePath}/settings/storage`;

        const body = { ...action.payload.bucket, projectId: '' };
        GlobalProperties.production ? body.projectId = 'Skysmack' : body.projectId = 'gifted-cooler-232815'

        return this.http.put<any>(url, body, { observe: 'response' })
            .pipe(
                map(httpResponse => {
                    return Object.assign({}, new ReduxAction<any, any>({
                        type: FILE_STORAGE_REDUX_KEY + NgFileStorageActions.UPDATE_BUCKET_SUCCESS,
                        payload: {
                            packagePath: action.payload.packagePath,
                            bucket: httpResponse.body
                        }
                    }));
                }),
                retry(3),
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse, any>({
                    type: FILE_STORAGE_REDUX_KEY + NgFileStorageActions.UPDATE_BUCKET_FAILURE,
                    payload: error,
                    error: true
                }))))
            );
    }
}
