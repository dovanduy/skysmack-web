import { ActionsObservable, ofType, Epic } from 'redux-observable';
import { ReduxAction, RollbackMeta, CommitMeta } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { HttpErrorResponse, LocalObject } from '@skysmack/framework';
import { NgUsersRequests } from './ng-users-requests';
import { NgUsersActions } from './ng-users-actions';
import { Injectable } from '@angular/core';
import { NgUsersNotifications } from '../ng-users-notifications';
import { GetUsersRolesPayload, GetUsersRolesSuccessPayload, User } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgUsersEpics {
    public epics: Epic[];

    constructor(protected requests: NgUsersRequests, protected notifications: NgUsersNotifications) {
        this.epics = [
            this.getUsersRolesEpic,
            this.getEpic,
            this.getSingleEpic,
            this.getAvailableUsersEpic,
            this.snackBarGetUserFailureEpic,
            this.snackBarGetSingleFailureEpic,
            this.snackBarCreateSuccessEpic,
            this.snackBarUpdateSuccessEpic,
            this.snackBarRemoveSuccessEpic,
            this.snackBarCreateFailureEpic,
            this.snackBarUpdateFailureEpic,
            this.snackBarRemoveFailureEpic,
        ];
    }

    public getUsersRolesEpic = (action$: ActionsObservable<ReduxAction<GetUsersRolesPayload>>): Observable<ReduxAction<GetUsersRolesSuccessPayload> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(NgUsersActions.GET_ROLES),
            switchMap((action: ReduxAction<GetUsersRolesPayload>) => this.requests.getUsersRoles(action.payload.userPath, action.payload.ids))
        );
    }

     public getEpic = (action$: ActionsObservable<ReduxAction>): Observable<ReduxAction<GetUsersSuccessPayload> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(NgUsersActions.GET_USERS),
            switchMap(() => this.requests.get())
        );
    }

    public getSingleEpic = (action$: ActionsObservable<ReduxAction<UserPathPayload>>): Observable<ReduxAction<GetUserSuccessPayload> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(NgUsersActions.GET_SINGLE_USER),
            switchMap(action => this.requests.getSingle(action))
        );
    }

    public getAvailableUsersEpic = (action$: ActionsObservable<ReduxAction>): Observable<ReduxAction<GetAvailableUsersSuccessPayload> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(NgUsersActions.GET_AVAILABLE_USERS),
            switchMap(() => this.requests.getAvailableUsers())
        );
    }

    public snackBarGetUserFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, RollbackMeta<LocalObject<User, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(NgUsersActions.GET_USERS_FAILURE),
        map((action) => {
            this.notifications.getPagedError(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarGetSingleFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<User, string>>>>): Observable<ReduxAction> => action$.pipe(
        ofType(NgUsersActions.GET_SINGLE_USER_FAILURE),
        map((action) => {
            this.notifications.getSingleError(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarCreateSuccessEpic = (action$: ActionsObservable<ReduxAction<unknown, CommitMeta<LocalObject<User, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(NgUsersActions.ADD_USER_SUCCESS),
        map((action) => {
            this.notifications.addSuccess(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarCreateFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<User, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(NgUsersActions.ADD_USER_FAILURE),
        map((action) => {
            this.notifications.addError(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarUpdateSuccessEpic = (action$: ActionsObservable<ReduxAction<unknown, CommitMeta<LocalObject<User, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(NgUsersActions.UPDATE_USER_SUCCESS),
        map(action => {
            this.notifications.updateSuccess(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarUpdateFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<User, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(NgUsersActions.UPDATE_USER_FAILURE),
        map(action => {
            this.notifications.updateError(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarRemoveSuccessEpic = (action$: ActionsObservable<ReduxAction<unknown, CommitMeta<LocalObject<User, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(NgUsersActions.DELETE_USER_SUCCESS),
        map((action) => {
            this.notifications.removeSuccess(action);
            return { type: 'NOTIFICATION' };
        })
    )

    public snackBarRemoveFailureEpic = (action$: ActionsObservable<ReduxAction<HttpErrorResponse, CommitMeta<LocalObject<User, string>[]>>>): Observable<ReduxAction> => action$.pipe(
        ofType(NgUsersActions.DELETE_USER_FAILURE),
        map((action) => {
            this.notifications.removeError(action);
            return { type: 'NOTIFICATION' };
        })
    )
}
