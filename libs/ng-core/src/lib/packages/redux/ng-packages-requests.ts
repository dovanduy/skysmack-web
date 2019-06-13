import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, Package, HttpErrorResponse, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { PackagesActions, PACKAGES_REDUX_KEY, PACKAGES_ADDITIONAL_PATHS } from '@skysmack/packages-skysmack-core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ReduxAction, GetAvailablePackagesSuccessPayload } from '@skysmack/redux';
import { NgRecordRequests } from '@skysmack/ng-framework';

@Injectable({ providedIn: 'root' })
export class NgPackagesRequests extends NgRecordRequests<Package, string> {
    protected identifier = 'path';
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, PACKAGES_REDUX_KEY, PACKAGES_ADDITIONAL_PATHS);
    }

    public getAvailablePackages(action: ReduxAction<string>): Observable<ReduxAction<GetAvailablePackagesSuccessPayload> | ReduxAction<HttpErrorResponse>> {
        const url = `${this.apiDomain.domain}/${action.payload}/available-packages`;
        return this.http.get<Package[]>(url, { observe: 'response' }).pipe(
            map(httpResponse => Object.assign({}, new ReduxAction<GetAvailablePackagesSuccessPayload>({
                type: PackagesActions.GET_AVAILABLE_PACKAGES_SUCCESS,
                payload: {
                    availablePackages: httpResponse.body ? httpResponse.body : [],
                    stateKey: action.payload
                }
            }))),
            catchError((error) => of(Object.assign({}, new ReduxAction({
                type: PackagesActions.GET_AVAILABLE_PACKAGES_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }
}
