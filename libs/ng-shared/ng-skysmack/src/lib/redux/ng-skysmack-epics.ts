import { Injectable } from '@angular/core';
import { Epic, ofType, ActionsObservable } from 'redux-observable';
import { NgSkysmackRequests } from './ng-skysmack-requests';
import { switchMap, mergeMap, map } from 'rxjs/operators';
import { NgSkysmackActions } from './ng-skysmack-actions';
import { AuthenticationActions, ReduxAction } from '@skysmack/redux';
import { PACKAGES_REDUX_KEY, PackagesActions, Skysmack } from '@skysmack/packages-skysmack-core';
import { Observable } from 'rxjs';
import { HttpErrorResponse, StrIndex } from '@skysmack/framework';

@Injectable({ providedIn: 'root' })
export class NgSkysmackEpics {
    public epics: Epic[];
    protected prefix = 'SKYSMACK_';

    constructor(
        protected requests: NgSkysmackRequests
    ) {
        this.epics = [
            // DO NOT CREATE MORE EPICS HERE - GO TO PACKAGES EPICS (bottom of class) INSTEAD.
            // Any other epic than the last here won't register/fire.
            this.getPermissionsEpic,
            this.getAvailablePermissionsEpic,
            this.getEpic
        ];
    }

    public getEpic = (action$: ActionsObservable<ReduxAction<string>>): Observable<ReduxAction<Skysmack> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(
                NgSkysmackActions.GET_SKYSMACK,
                PACKAGES_REDUX_KEY + PackagesActions.ADD_SUCCESS,
                PACKAGES_REDUX_KEY + PackagesActions.UPDATE_SUCCESS,
                PACKAGES_REDUX_KEY + PackagesActions.DELETE_SUCCESS,
                AuthenticationActions.LOG_OUT,
            ),
            mergeMap(action => {
                return this.requests.get(action);
            })
        );
    }
    
    public getPermissionsEpic = (action$: ActionsObservable<ReduxAction<string>>): Observable<ReduxAction<string[]> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(NgSkysmackActions.GET_PACKAGE_PERMISSIONS),
            mergeMap(action => {
                return this.requests.getPermissions(action as any);
            })
        );
    }

    public getAvailablePermissionsEpic = (action$: ActionsObservable<ReduxAction<string>>): Observable<ReduxAction<StrIndex<string>> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(NgSkysmackActions.GET_AVAILABLE_PACKAGE_PERMISSIONS),
            mergeMap(action => {
                return this.requests.getAvailablePermissions(action as any);
            })
        );
    }
}
