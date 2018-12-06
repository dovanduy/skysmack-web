import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SkysmackRequests, Skysmack, SkysmackActions } from '@skysmack/packages-skysmack';
import { Observable, of } from 'rxjs';
import { map, take, retry, catchError } from 'rxjs/operators';
import { ApiDomain, HttpErrorResponse } from '@skysmack/framework';
import { ReduxAction } from '@skysmack/redux';

@Injectable({
    providedIn: 'root',
})
export class NgSkysmackRequests implements SkysmackRequests {
    private retryTimes = 3;

    protected prefix: 'SKYSMACK_';
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') private apiDomain: ApiDomain
    ) { }

    public get(): Observable<ReduxAction<Skysmack> | ReduxAction<HttpErrorResponse>> {
        return this.http.get<Skysmack>(this.apiDomain.domain + '/skysmack', { observe: 'response' }).pipe(
            map(response => Object.assign({}, new ReduxAction<Skysmack>({
                type: SkysmackActions.GET_SKYSMACK_SUCCESS,
                payload: response.body
            }))),
            retry(this.retryTimes),
            catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                type: this.prefix + 'GET_FAILURE',
                payload: error,
                error: true
            }))))
        );
    }
}
