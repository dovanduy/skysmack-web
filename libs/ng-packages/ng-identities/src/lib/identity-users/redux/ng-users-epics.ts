import { RecordEpicsBase } from '@skysmack/ng-framework';
import { User, GetUsersRolesPayload, GetUsersRolesSuccessPayload, USERS_REDUX_KEY, UserRoles } from '@skysmack/packages-identities';
import { ActionsObservable, ofType } from 'redux-observable';
import { ReduxAction, } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { HttpErrorResponse, NumIndex, HttpResponse, jsonPrint, QueueItem, flattenArray, pipeFns, join, getValues } from '@skysmack/framework';
import { NgUsersRequests } from './ng-users-requests';
import { NgUsersActions } from './ng-users-actions';
import { Injectable } from '@angular/core';
import { NgUsersNotifications } from '../ng-users-notifications';

@Injectable({ providedIn: 'root' })
export class NgUsersEpics extends RecordEpicsBase<User, number> {
    constructor(protected requests: NgUsersRequests, protected notifications: NgUsersNotifications) {
        super(requests, USERS_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            this.getUsersRolesEpic,
            this.addUserRoleFailureEpic,
            this.removeUserRoleFailureEpic
        ]);
    }

    public getUsersRolesEpic = (action$: ActionsObservable<ReduxAction<GetUsersRolesPayload>>): Observable<ReduxAction<GetUsersRolesSuccessPayload> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(this.prefix + NgUsersActions.GET_ROLES),
            switchMap((action: ReduxAction<GetUsersRolesPayload>) => this.requests.getUsersRoles(action.payload.packagePath, action.payload.ids))
        );
    }

    public addUserRoleFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, { stateKey: string, value: UserRoles[], queueItems: QueueItem[] }>>): Observable<ReduxAction<any> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(this.prefix + NgUsersActions.ADD_ROLES_FAILURE),
            map(action => {
                this.notifications.showMessage('USERS.ROLES.ADD_ROLES_FAILURE', { 1: this.getRolesString(action.meta.value) });
                return { type: 'NOTIFICATION' };
            })
        );
    };

    public removeUserRoleFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, { stateKey: string, value: UserRoles[], queueItems: QueueItem[] }>>): Observable<ReduxAction<any> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(this.prefix + NgUsersActions.REMOVE_ROLES_FAILURE),
            map(action => {
                this.notifications.showMessage('USERS.ROLES.REMOVE_ROLES_FAILURE', { 1: this.getRolesString(action.meta.value) });
                return { type: 'NOTIFICATION' };
            })
        );
    };

    private getRolesString(userRoles: UserRoles[]): string {
        const roleNames = userRoles.reduce((a, b) => a.concat(b.roleNames), [] as string[])
        return roleNames.join(', ');
    }
}
