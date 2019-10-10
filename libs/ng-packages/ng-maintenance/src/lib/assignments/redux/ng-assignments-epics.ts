import { Injectable } from '@angular/core';
import { Epic, ActionsObservable, ofType } from 'redux-observable';
import { ReduxAction } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@skysmack/framework';
import { mergeMap } from 'rxjs/operators';
import { NgAssignmentsRequests } from './ng-assignments-requests';
import { AssignmentsActions } from 'libs/packages/maintenance/src';

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

    public getEpic = (action$: ActionsObservable<ReduxAction<{ packagePath: string, from: Date, due: Date }>>): Observable<ReduxAction<any> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(AssignmentsActions.ASSIGNMENTS_GET),
            mergeMap(action => this.requests.get(action)),
        );
    }
}