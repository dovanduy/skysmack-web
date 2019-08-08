import { Application, APPLICATIONS_REDUX_KEY, APPLICATIONS_ADDITIONAL_PATHS, GetApplicationsRolesSuccessPayload } from '@skysmack/packages-identities';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, HttpErrorResponse, NumIndex } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { NgApplicationsActions } from './ng-applications-actions';
import { Observable, of } from 'rxjs';
import { ReduxAction } from '@skysmack/redux';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgApplicationsRequests extends NgRecordRequests<Application, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, APPLICATIONS_REDUX_KEY, APPLICATIONS_ADDITIONAL_PATHS);
    }

    public getApplicationsRoles(packagePath: string, ids: number[]): Observable<ReduxAction<GetApplicationsRolesSuccessPayload> | ReduxAction<HttpErrorResponse>> {
        let url = this.addAdditionalPaths(`${this.apiDomain.domain}/${packagePath}`);
        url = this.appendValues(url + '/roles', ids);

        return this.http.get<NumIndex<string[]>>(url, { observe: 'response' })
            .pipe(
                map(response => Object.assign({}, new ReduxAction<GetApplicationsRolesSuccessPayload>({
                    type: this.prefix + NgApplicationsActions.GET_APPLICATION_ROLES_SUCCESS,
                    payload: {
                        applicationRoles: response.body,
                        packagePath
                    }
                }))),
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                    type: this.prefix + NgApplicationsActions.GET_APPLICATION_ROLES_FAILURE,
                    error: true,
                    payload: error
                }))))
            );

    }
}
