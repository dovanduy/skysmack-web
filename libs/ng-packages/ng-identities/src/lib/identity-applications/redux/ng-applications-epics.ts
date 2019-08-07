import { RecordEpicsBase } from '@skysmack/ng-framework';
import { Application, APPLICATIONS_REDUX_KEY, GetApplicationsRolesPayload, GetApplicationsRolesSuccessPayload } from '@skysmack/packages-identities';
import { NgApplicationsRequests } from './ng-applications-requests';
import { Injectable } from '@angular/core';
import { NgApplicationsNotifications } from '../ng-applications-notifications';
import { ActionsObservable, ofType } from 'redux-observable';
import { ReduxAction } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@skysmack/framework';
import { NgApplicationsActions } from './ng-applications-actions';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgApplicationsEpics extends RecordEpicsBase<Application, number> {
    constructor(
        protected requests: NgApplicationsRequests,
        protected notifications: NgApplicationsNotifications
    ) {
        super(requests, APPLICATIONS_REDUX_KEY, notifications);

        this.epics = this.epics.concat([
            this.getApplicationsRolesEpic
        ]);
    }

    public getApplicationsRolesEpic = (action$: ActionsObservable<ReduxAction<GetApplicationsRolesPayload>>): Observable<ReduxAction<GetApplicationsRolesSuccessPayload> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(this.prefix + NgApplicationsActions.GET_APPLICATION_ROLES),
            switchMap((action: ReduxAction<GetApplicationsRolesPayload>) => this.requests.getApplicationsRoles(action.payload.packagePath, action.payload.ids))
        );
    }
}
