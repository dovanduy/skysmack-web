import { ofType, ActionsObservable, Epic } from 'redux-observable';
import { ReduxAction, PackagePathPayload, GetAvailablePackagesSuccessPayload } from '@skysmack/redux';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NgPackagesRequests } from './ng-packages-requests';
import { GetPackagesSuccessPayload, GetPackageSuccessPayload } from '@skysmack/packages-skysmack-core';
import { NgPackagesActions } from './ng-packages-actions';
import { HttpErrorResponse } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgPackagesEpics {
    public epics: Epic[];

    constructor(protected requests: NgPackagesRequests) {
        this.epics = [
            this.getEpic,
            this.getSingleEpic,
            this.getAvailablePackagesEpic
        ];
    }

    public getEpic = (action$: ActionsObservable<ReduxAction>): Observable<ReduxAction<GetPackagesSuccessPayload> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(NgPackagesActions.GET_PACKAGES),
            switchMap(() => this.requests.get())
        );
    }

    public getSingleEpic = (action$: ActionsObservable<ReduxAction<PackagePathPayload>>): Observable<ReduxAction<GetPackageSuccessPayload> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(NgPackagesActions.GET_SINGLE_PACKAGE),
            switchMap(action => this.requests.getSingle(action))
        );
    }

    public getAvailablePackagesEpic = (action$: ActionsObservable<ReduxAction>): Observable<ReduxAction<GetAvailablePackagesSuccessPayload> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(NgPackagesActions.GET_AVAILABLE_PACKAGES),
            switchMap(() => this.requests.getAvailablePackages())
        );
    }
}
