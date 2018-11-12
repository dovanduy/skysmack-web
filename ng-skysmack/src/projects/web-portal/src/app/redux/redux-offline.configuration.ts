import { NgRedux } from '@angular-redux/store';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import defaultQueue from '@redux-offline/redux-offline/lib/defaults/queue';
import { Config, OfflineAction, OfflineState } from '@redux-offline/redux-offline/lib/types';
import { AnyAction } from 'redux';
import { createTransform } from 'redux-persist';
import { Observable } from 'rxjs';
import { share, take } from 'rxjs/operators';
import { TOOGLE_HYDRATED } from './hydrated-reducer';

// See https://github.com/redux-offline/redux-offline#configuration
@Injectable({ providedIn: 'root' })
export class ReduxOfflineConfiguration implements Config {

    public hydrated = false;

    public queue = {
        ...defaultQueue,
        enqueue(outbox, action) {
            return action.type === 'CANCEL_OFFLINE_ACTION'
                ? outbox.filter(item => (item.payload as any).localId !== action.payload.localId)
                : [...outbox, action];
        }
    };

    constructor(
        public ngRedux: NgRedux<any>,
        public http: HttpClient,
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
                (inboundState, key) => {
                    return inboundState;
                },
                (outboundState, key) => {
                    const online = (this.ngRedux.getState() as any).offline.online;
                    if (online) {
                        // If we are online, we want fresh data from the server.
                        if (this.hydrated) {
                            return outboundState;
                        }
                    } else {
                        // Else we want the locally stored data in redux.
                        return outboundState;
                    }
                }, { blacklist: ['offline', 'authenticatedUser', 'settings'] }
            )
        ]
    };

    public persistCallback = (callback?: any) => {
        this.hydrated = true;
        this.ngRedux.dispatch({ type: TOOGLE_HYDRATED, payload: true });
    }

    public effect = (effect: any, action: AnyAction): Promise<any> => {
        return new Promise<HttpResponseBase>((resolve, reject) => {
            const request = effect.request;
            let result: Observable<any> = null;

            switch (request.method) {
                case 'HttpMethod.POST':
                    result = this.http.post<any>(request.url, request.body, request.options as any).pipe(share());
                    break;
                case 'HttpMethod.PUT':
                    result = this.http.put<any>(request.url, request.body, request.options as any).pipe(share());
                    break;
                case 'HttpMethod.DELETE':
                    result = this.http.delete<any>(request.url, request.options as any).pipe(share());
                    break;
                default:
                    return;
            }

            result.subscribe(response => resolve(response), error => reject(error));
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