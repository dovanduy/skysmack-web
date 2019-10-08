import { Injectable } from '@angular/core';
import { Epic, ActionsObservable, ofType } from 'redux-observable';
import { ReduxAction } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@skysmack/framework';
import { mergeMap } from 'rxjs/operators';
import { NgAssignmentsRequests } from './ng-assignments-requests';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsEpics {
    public epics: Epic[];
    constructor(
        private requests: NgAssignmentsRequests
    ) {
        this.epics = [
            this.getEpic
        ];
    }

    public getEpic = (action$: ActionsObservable<ReduxAction<{ packagePath: string, from: Date, to: Date }>>): Observable<ReduxAction<any> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(),
            mergeMap(action => this.requests.get(action)),
        );
    }

}