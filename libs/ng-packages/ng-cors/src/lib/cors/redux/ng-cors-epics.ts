import { Injectable } from '@angular/core';
import { NgCorsRequests } from './ng-cors-requests';
import { Epic, ActionsObservable, ofType } from 'redux-observable';
import { ReduxAction, PackagePathPayload } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@skysmack/framework';
import { CORS_REDUX_KEY } from '@skysmack/packages-cors';
import { NgCorsActions } from './ng-cors-actions';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CorsEpics {
    public epics: Epic[];

    constructor(protected requests: NgCorsRequests) {
        this.epics = [
            this.getDomainsEpic
        ];
    }

    public getDomainsEpic = (action$: ActionsObservable<ReduxAction<PackagePathPayload>>): Observable<ReduxAction<{ packagePath: string, domains: string[] }> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(CORS_REDUX_KEY + NgCorsActions.GET_DOMAINS),
            switchMap((action: ReduxAction<PackagePathPayload>) => this.requests.getDomains(action.payload.packagePath))
        );
    }
}
