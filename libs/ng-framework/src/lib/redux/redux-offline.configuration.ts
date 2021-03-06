import { NgRedux } from '@angular-redux/store';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import defaultQueue from '@redux-offline/redux-offline/lib/defaults/queue';
import { Config, OfflineAction, OfflineState } from '@redux-offline/redux-offline/lib/types';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { HttpMethod, ApiDomain, HttpSuccessResponse, HttpErrorResponse, GlobalProperties } from '@skysmack/framework';
import { Effect, RecordActionsBase, cancelRecordActionOutboxFilter, cancelFieldActionOutboxFilter, FieldActions, TOOGLE_HYDRATED } from '@skysmack/redux';
import * as localForage from 'localforage';

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
                    case 'FIELD_' + FieldActions.CANCEL_FIELD_ACTION: return cancelFieldActionOutboxFilter(outbox, action);
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
    public offlineActionTracker: {
        registerAction: (number: any) => Promise<any> | (() => void); resolveAction: (number: any, any: any) => void | (() => void); rejectAction: (number: any, Error: any) => void | (() => void);
    };

    // Overrides =============
    public persistOptions = { storage: localForage, keyPrefix: 'ss_' };

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

        // Don't retry in development
        if (!GlobalProperties.production) {
            return true;
        }

        // Retry 3 times on 5xx and 0 errors (takes roughly 25 seconds before giving up)
        if (error.status >= 500) {
            // First retry is 0.
            if (retries <= 2) {
                return false;
            } else {
                return true;
            }
        }

        // Retry for as long as possible on 0 errors.
        if (error.status === 0) {
            return false;
        }

        // Don't retry on < 4xx errors
        return true;
    }
}
