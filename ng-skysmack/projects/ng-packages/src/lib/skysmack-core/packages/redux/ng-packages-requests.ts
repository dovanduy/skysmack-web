import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, Package, HttpErrorResponse } from '@skysmack/framework';
import { PackagesRequests, GetPackagesSuccessPayload, PackagesActions, GetPackageSuccessPayload } from '@skysmack/packages-skysmack-core';
import { Observable, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ReduxAction, PackagePathPayload, GetAvailablePackagesSuccessPayload } from '@skysmack/redux';

@Injectable({ providedIn: 'root' })
export class NgPackagesRequests implements PackagesRequests {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
    }

    public get(): Observable<ReduxAction<GetPackagesSuccessPayload> | ReduxAction<HttpErrorResponse>> {
        const url = this.apiDomain.domain + '/skysmack/packages';
        return this.http.get<Package[]>(url, { observe: 'response' })
            .pipe(
                map(httpResponse => {
                    return Object.assign({}, new ReduxAction<GetPackagesSuccessPayload>({
                        type: PackagesActions.GET_PACKAGES_SUCCESS,
                        payload: {
                            packages: httpResponse.body ? httpResponse.body : []
                        }
                    }));
                }),
                retry(1),
                catchError((error) => of(Object.assign({}, new ReduxAction({
                    type: PackagesActions.GET_PACKAGES_FAILURE,
                    payload: error,
                    error: true
                }))))
            );
    }

    public getSingle(action: ReduxAction<PackagePathPayload>): Observable<ReduxAction<GetPackageSuccessPayload> | ReduxAction<HttpErrorResponse>> {
        const url = `${this.apiDomain.domain}/skysmack/packages/${action.payload.packagePath}`;
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

    public getAvailablePackages(): Observable<ReduxAction<GetAvailablePackagesSuccessPayload> | ReduxAction<HttpErrorResponse>> {
        const url = this.apiDomain.domain + '/skysmack/available-packages';
        return this.http.get<Package[]>(url, { observe: 'response' }).pipe(
            map(httpResponse => Object.assign({}, new ReduxAction<GetAvailablePackagesSuccessPayload>({
                type: PackagesActions.GET_AVAILABLE_PACKAGES_SUCCESS,
                payload: {
                    availablePackages: httpResponse.body ? httpResponse.body : []
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
