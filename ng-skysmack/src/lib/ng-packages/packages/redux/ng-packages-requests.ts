import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, Package } from '@skysmack/framework';
import { PackagesRequests, GetPackagesSuccessPayload, PackagesActions, GetPackageSuccessPayload } from '@skysmack/packages';
import { Observable, of } from '@skysmack/framework/node_modules/rxjs';
import { map, catchError } from 'rxjs/operators';
import { ReduxAction, PackagePathPayload } from '@skysmack/redux';

@Injectable({ providedIn: 'root' })
export class NgPackagesRequests implements PackagesRequests {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
    }

    public get(): Observable<ReduxAction<GetPackagesSuccessPayload>> {
        const url = this.apiDomain.domain + '/skysmack/packages';
        return this.http.get<Package[]>(url, { observe: 'response' }).pipe(
            map(httpResponse => Object.assign({}, new ReduxAction<GetPackagesSuccessPayload>({
                type: PackagesActions.GET_PACKAGES_SUCCESS,
                payload: {
                    packages: httpResponse.body ? httpResponse.body : []
                }
            }))),
            catchError((error) => of(Object.assign({}, new ReduxAction({
                type: PackagesActions.GET_PACKAGES_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }

    public getSingle(action: ReduxAction<PackagePathPayload>): Observable<ReduxAction<GetPackageSuccessPayload>> {
        const url = `${this.apiDomain.domain}/skysmack/packages/${action.payload}`;
        return this.http.get<Package>(url, { observe: 'response' }).pipe(
            map(httpResponse => Object.assign({}, new ReduxAction<GetPackageSuccessPayload>({
                type: PackagesActions.GET_SINGLE_PACKAGE_SUCCESS,
                payload: {
                    _package: httpResponse.body
                }
            }))),
            catchError((error) => of(Object.assign({}, new ReduxAction({
                type: PackagesActions.GET_SINGLE_PACKAGE_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }
}
