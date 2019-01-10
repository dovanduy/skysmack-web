import { User } from '@skysmack/packages-identities';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-redux';
import { catchError } from 'rxjs/operators';
import { ReduxAction } from '@skysmack/redux';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgUsersRequests extends NgRecordRequests<User, number> {
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
                catchError((error) => of(Object.assign({}, new ReduxAction({
                    type: 'SET_PASSWORD_ERROR',
                    error: true
                }))))
            );
    }
}
