import { Injectable } from '@angular/core';
import { Epic, ofType } from 'redux-observable';
import { NgSkysmackRequests } from './ng-skysmack-requests';
import { switchMap, tap } from 'rxjs/operators';
import { NgSkysmackActions } from './ng-skysmack-actions';
import { AuthenticationActions } from '@skysmack/redux';
import { PACKAGES_REDUX_KEY } from '@skysmack/packages-skysmack-core';
import { NgPackagesActions } from '../../packages';

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
            this.getEpic
        ];
    }

    public getEpic = (action$) => {
        return action$.pipe(
            ofType(
                NgSkysmackActions.GET_SKYSMACK,
                PACKAGES_REDUX_KEY + NgPackagesActions.ADD_SUCCESS,
                PACKAGES_REDUX_KEY + NgPackagesActions.UPDATE_SUCCESS,
                PACKAGES_REDUX_KEY + NgPackagesActions.DELETE_SUCCESS,
                AuthenticationActions.LOG_OUT,
            ),
            switchMap(() => this.requests.get()),
        );
    }
}
