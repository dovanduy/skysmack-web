import { RecordEpicsBase } from '@skysmack/ng-redux';
import { User, GetUsersRolesPayload, GetUsersRolesSuccessPayload } from '@skysmack/packages-identities';
import { ActionsObservable, ofType } from 'redux-observable';
import { ReduxAction } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@skysmack/framework';
import { NgUsersRequests } from './ng-users-requests';
import { NgUsersActions } from './ng-users-actions';
import { Injectable } from '@angular/core';
import { NgUsersNotifications } from '../ng-users-notifications';

@Injectable({ providedIn: 'root' })
export class NgUsersEpics extends RecordEpicsBase<User, number> {
    constructor(protected requests: NgUsersRequests, protected notifications: NgUsersNotifications) {
        super(requests, 'USERS_', notifications);
        this.epics = this.epics.concat([
            this.getUsersRolesEpic
        ]);
    }

    public getUsersRolesEpic = (action$: ActionsObservable<ReduxAction<GetUsersRolesPayload>>): Observable<ReduxAction<GetUsersRolesSuccessPayload> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(this.prefix + NgUsersActions.GET_ROLES),
            switchMap((action: ReduxAction<GetUsersRolesPayload>) => this.requests.getUsersRoles(action.payload.packagePath, action.payload.ids))
        );
    }
}
