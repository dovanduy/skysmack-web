import { Injectable } from '@angular/core';
import { Epic, ofType } from 'redux-observable';
import { NgSkysmackRequests } from './ng-skysmack-requests';
import { switchMap } from 'rxjs/operators';
import { NgSkysmackActions } from './ng-skysmack-actions';

@Injectable({ providedIn: 'root' })
export class NgSkysmackEpics {
    public epics: Epic[];
    protected prefix = 'SKYSMACK_';

    constructor(
        protected requests: NgSkysmackRequests
    ) {
        this.epics = [
            this.get
        ];
    }

    public get = (action$) => {
        return action$.pipe(
            ofType(NgSkysmackActions.GET_SKYSMACK),
            switchMap(() => this.requests.get()),
        );
    }
}