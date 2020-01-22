import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, HttpErrorResponse, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { catchError, map } from 'rxjs/operators';
import { ReduxAction } from '@skysmack/redux';
import { of, Observable } from 'rxjs';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { NgUsersActions } from './ng-users-actions';
import { User, GetUsersRolesSuccessPayload, USERS_ADDITIONAL_PATHS, USERS_REDUX_KEY, UserRoles } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgUsersRequests extends NgRecordRequests<User, number>  {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, USERS_REDUX_KEY, USERS_ADDITIONAL_PATHS);
    }

    public setPassword(values: { id: number, password: string, confirmPassword: string }, userPath: string) {
        const url = `${this.apiDomain.domain}/${userPath}/users/set-passwords`;
        return this.http.put(url, [values], { observe: 'response' })
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

        return this.http.get<UserRoles[]>(url, { observe: 'response' })
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
