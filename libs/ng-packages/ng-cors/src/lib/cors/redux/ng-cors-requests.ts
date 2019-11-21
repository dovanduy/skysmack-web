import { CORS_REDUX_KEY, CORS_ADDITIONAL_PATHS } from '@skysmack/packages-cors';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, HttpErrorResponse } from '@skysmack/framework';
import { Observable, of } from 'rxjs';
import { ReduxAction } from '@skysmack/redux';
import { map, catchError } from 'rxjs/operators';
import { NgCorsActions } from './ng-cors-actions';

@Injectable({ providedIn: 'root' })
export class NgCorsRequests {
    protected prefix: string = CORS_REDUX_KEY;
    protected additionalPaths: string[] = CORS_ADDITIONAL_PATHS;

    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
    }

    public getDomains(packagePath: string): Observable<ReduxAction<{ packagePath: string, domains: string[] }> | ReduxAction<HttpErrorResponse>> {
        let url = `${this.apiDomain.domain}/${packagePath}`;

        return this.http.get<string[]>(url, { observe: 'response' })
            .pipe(
                map(response => Object.assign({}, new ReduxAction<{ packagePath: string, domains: string[] }>({
                    type: this.prefix + NgCorsActions.GET_DOMAINS_SUCCESS,
                    payload: {
                        domains: response.body,
                        packagePath
                    }
                }))),
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                    type: this.prefix + NgCorsActions.GET_DOMAINS_FAILURE,
                    error: true,
                    payload: error
                }))))
            );

    }
}
