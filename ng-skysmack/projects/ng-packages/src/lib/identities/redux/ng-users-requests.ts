import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, StrIndex, HttpErrorResponse } from '@skysmack/framework';
import { catchError, map } from 'rxjs/operators';
import { ReduxAction } from '@skysmack/redux';
import { of, Observable } from 'rxjs';
import { UsersRequests, User, GetUsersRolesSuccessPayload } from '@skysmack/packages-identities';
import { NgRecordRequests } from '@skysmack/ng-redux';
import { NgUsersActions } from './ng-users-actions';

@Injectable({ providedIn: 'root' })
export class NgUsersRequests extends NgRecordRequests<User, number> implements UsersRequests {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'USERS_', ['users']);
    }

    public setPassword(values: { password: string, confirmPassword: string }, packagePath: string, id: number) {
        const url = `${this.apiDomain.domain}/${packagePath}/users/set-passwords/${id}`;
        return this.http.put(url, values, { observe: 'response' })
            .pipe(
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                    type: 'SET_PASSWORD_ERROR',
                    error: true
                }))))
            );
    }

    public getUsersRoles(packagePath: string, ids: number[]): Observable<ReduxAction<GetUsersRolesSuccessPayload> | ReduxAction<HttpErrorResponse>> {
        let url = this.addAdditionalPaths(`${this.apiDomain.domain}/${packagePath}`);
        url = this.appendValues(url + '/roles', ids);

        return this.http.get<{}>(url, { observe: 'response' })
            .pipe(
                map(response => Object.assign({}, new ReduxAction<GetUsersRolesSuccessPayload>({
                    type: this.prefix + NgUsersActions.GET_ROLES_SUCCESS,
                    payload: {
                        userRoles: response.body,
                        packagePath
                    }
                }))),
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                    type: this.prefix + NgUsersActions.GET_ROLES_FAILURE,
                    error: true,
                    payload: error
                }))))
            );
    }
}
