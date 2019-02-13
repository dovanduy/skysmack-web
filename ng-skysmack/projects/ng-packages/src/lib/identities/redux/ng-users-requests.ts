import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, HttpErrorResponse, NumIndex } from '@skysmack/framework';
import { catchError, map } from 'rxjs/operators';
import { ReduxAction } from '@skysmack/redux';
import { of, Observable } from 'rxjs';
import { NgRecordRequests } from '@skysmack/ng-redux';
import { NgUsersActions } from './ng-users-actions';
import { User, GetUsersRolesSuccessPayload } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgUsersRequests extends NgRecordRequests<User, number>  {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'USERS_', ['users']);
    }

    public setPassword(values: { password: string, confirmPassword: string }, userPath: string, id: number) {
        const url = `${this.apiDomain.domain}/${userPath}/users/set-passwords/${id}`;
        return this.http.put(url, values, { observe: 'response' })
            .pipe(
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                    type: 'SET_PASSWORD_ERROR',
                    error: true
                }))))
            );
    }

    public getUsersRoles(userPath: string, ids: number[]): Observable<ReduxAction<GetUsersRolesSuccessPayload> | ReduxAction<HttpErrorResponse>> {
        let url = this.addAdditionalPaths(`${this.apiDomain.domain}/${userPath}`);
        url = this.appendValues(url + '/roles', ids);

        return this.http.get<NumIndex<string[]>>(url, { observe: 'response' })
            .pipe(
                map(response => Object.assign({}, new ReduxAction<GetUsersRolesSuccessPayload>({
                    type: this.prefix + NgUsersActions.GET_ROLES_SUCCESS,
                    payload: {
                        userRoles: response.body,
                        userPath
                    }
                }))),
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                    type: this.prefix + NgUsersActions.GET_ROLES_FAILURE,
                    error: true,
                    payload: error
                }))))
            );
    }

    public get(): Observable<ReduxAction<GetUsersSuccessPayload> | ReduxAction<HttpErrorResponse>> {
        const url = this.apiDomain.domain + '/skysmack/users';
        return this.http.get<User[]>(url, { observe: 'response' })
            .pipe(
                map(httpResponse => {
                    return Object.assign({}, new ReduxAction<GetUsersSuccessPayload>({
                        type: UsersActions.GET_USERS_SUCCESS,
                        payload: {
                            users: httpResponse.body ? httpResponse.body : []
                        }
                    }));
                }),
                retry(1),
                catchError((error) => of(Object.assign({}, new ReduxAction({
                    type: UsersActions.GET_USERS_FAILURE,
                    payload: error,
                    error: true
                }))))
            );
    }

    public getSingle(action: ReduxAction<UserPathPayload>): Observable<ReduxAction<GetUserSuccessPayload> | ReduxAction<HttpErrorResponse>> {
        const url = `${this.apiDomain.domain}/skysmack/users/${action.payload.userPath}`;
        return this.http.get<User>(url, { observe: 'response' }).pipe(
            map(httpResponse => Object.assign({}, new ReduxAction<GetUserSuccessPayload>({
                type: UsersActions.GET_SINGLE_USER_SUCCESS,
                payload: {
                    _user: httpResponse.body
                }
            }))),
            catchError((error) => of(Object.assign({}, new ReduxAction({
                type: UsersActions.GET_SINGLE_USER_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }

    public getAvailableUsers(): Observable<ReduxAction<GetAvailableUsersSuccessPayload> | ReduxAction<HttpErrorResponse>> {
        const url = this.apiDomain.domain + '/skysmack/available-users';
        return this.http.get<User[]>(url, { observe: 'response' }).pipe(
            map(httpResponse => Object.assign({}, new ReduxAction<GetAvailableUsersSuccessPayload>({
                type: UsersActions.GET_AVAILABLE_USERS_SUCCESS,
                payload: {
                    availableUsers: httpResponse.body ? httpResponse.body : []
                }
            }))),
            catchError((error) => of(Object.assign({}, new ReduxAction({
                type: UsersActions.GET_AVAILABLE_USERS_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }
}
