import { NgRedux } from '@angular-redux/store';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import defaultQueue from '@redux-offline/redux-offline/lib/defaults/queue';
import { Config, OfflineAction, OfflineState, AppState } from '@redux-offline/redux-offline/lib/types';
import { createTransform } from 'redux-persist';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { TOOGLE_HYDRATED } from './hydrated-reducer';
import { HttpMethod, ApiDomain, HttpSuccessResponse, HttpErrorResponse } from '@skysmack/framework';
import { Effect, RecordActionsBase, cancelRecordActionOutboxFilter, cancelFieldActionOutboxFilter, FieldActions } from '@skysmack/redux';
import { PackagesActions, cancelPackageActionOutboxFilter } from '@skysmack/packages-skysmack-core';

// See https://github.com/redux-offline/redux-offline#configuration
@Injectable({ providedIn: 'root' })
export class ReduxOfflineConfiguration implements Config {

    public hydrated = false;

    public queue = {
        ...defaultQueue,
        enqueue(outbox, action) {
            if (action.meta.isCancelAction) {
                switch (action.type) {
                    case action.payload.prefix + RecordActionsBase.CANCEL_RECORD_ACTION: return cancelRecordActionOutboxFilter(outbox, action);
                    case PackagesActions.CANCEL_PACKAGE_ACTION: return cancelPackageActionOutboxFilter(outbox, action);
                    case action.payload.prefix + FieldActions.CANCEL_FIELD_ACTION: return cancelFieldActionOutboxFilter(outbox, action);
                    default:
                        return [...outbox, action];
                }
            } else {
                return [...outbox, action];
            }
        }
    };

    constructor(
        public ngRedux: NgRedux<any>,
        public http: HttpClient,
        @Inject('ApiDomain') public apiDomain: ApiDomain
    ) { }

    // Defaults =============
    public defaultCommit: { type: string; };
    public defaultRollback: { type: string; };
    public detectNetwork: (callback: (result: boolean) => void) => void;
    public offlineStateLens: (state: any) => { get: OfflineState; set: (offlineState?: OfflineState) => any; };
    public persist: (store: any) => any;
    public retry: (action: OfflineAction, retries: number) => number | void;
    public persistAutoRehydrate: (config?: { [key: string]: any; }) => (next: any) => any;
    public offlineActionTracker: { // Else we want the locally stored data in redux.
        registerAction: (number: any) => Promise<any> | (() => void); resolveAction: (number: any, any: any) => void | (() => void); rejectAction: (number: any, Error: any) => void | (() => void);
    };


    // Overrides =============
    public persistOptions = {
        transforms: [
            createTransform(
                (inboundState) => {
                    return inboundState;
                },
                (outboundState) => {
                    const online = (this.ngRedux.getState() as AppState).offline.online;
                    if (online) {
                        // If we are online, we want fresh data from the server.
                        if (this.hydrated) {
                            return outboundState;
                        }
                    } else {
                        // Else we want the locally stored data in redux.
                        return outboundState;
                    }
                }, { blacklist: ['offline', 'authentication', 'settings'] }
            )
        ]
    };

    public persistCallback = () => {
        this.hydrated = true;
        this.ngRedux.dispatch({ type: TOOGLE_HYDRATED, payload: true });
    }

    public effect = (effect: Effect<any>): Promise<any> => {
        return new Promise<HttpSuccessResponse<any> | HttpErrorResponse>((resolve, reject) => {
            const request = effect.request;
            let result: Observable<HttpEvent<any>> = null;

            const requestOptions = {
                headers: request.headers,
                observe: 'response',
                params: request.params,
                responseType: 'json'
            };

            const url = this.apiDomain.domain + '/' + request.path;

            switch (request.method) {

                case HttpMethod.POST:
                    result = this.http.post<any>(url, request.body, requestOptions as any).pipe(share());
                    break;
                case HttpMethod.PUT:
                    result = this.http.put<any>(url, request.body, requestOptions as any).pipe(share());
                    break;
                case HttpMethod.DELETE:
                    result = this.http.delete<any>(url, requestOptions as any).pipe(share());
                    break;
                default:
                    return;
            }

            result.subscribe(response => resolve(new HttpSuccessResponse(response as any)), error => reject(new HttpErrorResponse(error)));
        });
    }

    public discard = (error: any, action: OfflineAction, retries: number) => {
        // This isn't an http error! Retry
        if ('status' in error === false) {
            return false;
        }

        // Retry 3 times on 5xx errors (takes roughly 25 seconds before giving up)
        if (error.status >= 500) {
            // First retry is 0.
            if (retries <= 2) {
                return false;
            } else {
                return true;
            }
        }

        // Don't retry on < 4xx errors
        return true;
        // return 400 <= error.status && error.status < 500;
    }
}
