import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, HttpErrorResponse, GlobalProperties } from '@skysmack/framework';
import { ReduxAction } from '@skysmack/redux';
import { Observable, of } from 'rxjs';
import { map, retry, catchError, share } from 'rxjs/operators';
import { NgFileStorageActions } from './ng-file-storage-actions';
import { FILE_STORAGE_REDUX_KEY, Bucket, FileStorageItem, GetStorageItemsSuccessPayload, GetStorageItemsPayload } from '@skysmack/packages-file-storage';
import { PageResponseExtensions } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgFileStorageRequests {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) { }

    public getStorageItems(action: ReduxAction<GetStorageItemsPayload>): Observable<ReduxAction<GetStorageItemsSuccessPayload> | ReduxAction<HttpErrorResponse>> {
        const storageQuery = action.payload.storageQuery;
        const url = `${this.apiDomain.domain}/${action.payload.packagePath}?pageSize=${storageQuery.pageSize}&pageNumber=${storageQuery.pageNumber}&prefix=${storageQuery.prefix}&delimiter=${storageQuery.delimiter}&includeTrailingDelimiter=${storageQuery.includeTrailingDelimiter}`;

        return this.http.get<FileStorageItem[]>(url, { observe: 'response' })
            .pipe(
                map(httpResponse => {
                    const sort = '';
                    const query = `${storageQuery.pageSize}:${storageQuery.pageNumber}:${storageQuery.prefix}:${storageQuery.delimiter}:${storageQuery.includeTrailingDelimiter}`
                    storageQuery.query = query;
                    return Object.assign({}, new ReduxAction<GetStorageItemsSuccessPayload>({
                        type: FILE_STORAGE_REDUX_KEY + NgFileStorageActions.GET_STORAGE_ITEMS_SUCCESS,
                        payload: {
                            entities: httpResponse.body ? httpResponse.body : [],
                            packagePath: action.payload.packagePath,
                            page: PageResponseExtensions.getPageResponse<string>(httpResponse.headers, httpResponse.body.map(record => record.selfLink), query, sort),
                            storageQuery,
                        }
                    }));
                }),
                share(),
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                    type: FILE_STORAGE_REDUX_KEY + NgFileStorageActions.GET_STORAGE_ITEMS_FAILURE,
                    payload: error,
                    error: true
                }))))
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
