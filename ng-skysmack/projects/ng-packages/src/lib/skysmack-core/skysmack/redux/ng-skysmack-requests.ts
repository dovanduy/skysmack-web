import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SkysmackRequests, Skysmack, SkysmackActions } from '@skysmack/packages-skysmack-core';
import { Observable, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { ApiDomain, HttpErrorResponse, API_DOMAIN_INJECTOR_TOKEN, StrIndex } from '@skysmack/framework';
import { ReduxAction } from '@skysmack/redux';

@Injectable({
    providedIn: 'root',
})
export class NgSkysmackRequests implements SkysmackRequests {
    private retryTimes = 3;

    protected prefix: 'SKYSMACK_';
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) private apiDomain: ApiDomain
    ) { }

    public get(): Observable<ReduxAction<Skysmack> | ReduxAction<HttpErrorResponse>> {
        return this.http.get<Skysmack>(this.apiDomain.domain + '/skysmack', { observe: 'response' }).pipe(
            map(response => Object.assign({}, new ReduxAction<Skysmack>({
                type: SkysmackActions.GET_SKYSMACK_SUCCESS,
                payload: response.body
            }))),
            retry(this.retryTimes),
            catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                type: SkysmackActions.GET_SKYSMACK_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }

    public getPermissions(action: ReduxAction<string>): Observable<ReduxAction<string[], string> | ReduxAction<HttpErrorResponse>> {
        return this.http.get<string[]>(`${this.apiDomain.domain}/skysmack/permissions/${action.payload}`, { observe: 'response' }).pipe(
            map(response => Object.assign({}, new ReduxAction<string[], string>({
                type: SkysmackActions.GET_PACKAGE_PERMISSIONS_SUCCESS,
                payload: response.body,
                meta: action.payload
            }))),
            retry(this.retryTimes),
            catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                type: SkysmackActions.GET_PACKAGE_PERMISSIONS_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }


    public getAvailablePermissions(action: ReduxAction<string>): Observable<ReduxAction<StrIndex<string>, string> | ReduxAction<HttpErrorResponse>> {
        return this.http.get<StrIndex<string>>(`${this.apiDomain.domain}/skysmack/permissions/available/${action.payload}`, { observe: 'response' }).pipe(
            map(response => Object.assign({}, new ReduxAction<StrIndex<string>, string>({
                type: SkysmackActions.GET_AVAILABLE_PACKAGE_PERMISSIONS_SUCCESS,
                payload: response.body,
                meta: action.payload
            }))),
            retry(this.retryTimes),
            catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                type: SkysmackActions.GET_AVAILABLE_PACKAGE_PERMISSIONS_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }
}
