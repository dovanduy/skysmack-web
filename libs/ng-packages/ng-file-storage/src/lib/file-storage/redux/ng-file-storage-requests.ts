import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, HttpErrorResponse } from '@skysmack/framework';
import { ReduxAction } from '@skysmack/redux';
import { Observable, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { NgFileStorageActions } from './ng-file-storage-actions';
import { FILE_STORAGE_REDUX_KEY } from '@skysmack/packages-file-storage';

@Injectable({ providedIn: 'root' })
export class NgFileStorageRequests {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) { }

    public updateSettings(action: ReduxAction<any>): Observable<ReduxAction<any>> {
        let url = `${this.apiDomain.domain}/${action.payload.packagePath}/settings/storage`;

        // Temp return data
        return of({
            type: FILE_STORAGE_REDUX_KEY + NgFileStorageActions.UPDATE_SETTINGS_SUCCESS,
            payload: {
                packagePath: action.payload.packagePath,
                settings: action.payload.settings
            }
        });

        return this.http.put<any>(url, { observe: 'response' })
            .pipe(
                map(httpResponse => {
                    return Object.assign({}, new ReduxAction<any, any>({
                        type: FILE_STORAGE_REDUX_KEY + NgFileStorageActions.UPDATE_SETTINGS_SUCCESS,
                        payload: {
                            packagePath: action.payload.packagePath,
                            settings: httpResponse.body
                        }
                    }));
                }),
                retry(3),
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse, any>({
                    type: FILE_STORAGE_REDUX_KEY + NgFileStorageActions.UPDATE_SETTINGS_FAILURE,
                    payload: error,
                    error: true
                }))))
            );
    }

    public getSettings(action: ReduxAction<any>): Observable<ReduxAction<any>> {
        let url = `${this.apiDomain.domain}/${action.payload.packagePath}/settings/storage`;

        return this.http.get<any>(url, { observe: 'response' })
            .pipe(
                map(httpResponse => {
                    return Object.assign({}, new ReduxAction<any, any>({
                        type: FILE_STORAGE_REDUX_KEY + NgFileStorageActions.GET_SETTINGS_SUCCESS,
                        payload: {
                            packagePath: action.payload.packagePath,
                            settings: httpResponse.body
                        }
                    }));
                }),
                retry(3),
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse, any>({
                    type: FILE_STORAGE_REDUX_KEY + NgFileStorageActions.GET_SETTINGS_FAILURE,
                    payload: error,
                    error: true
                }))))
            );
    }
}
