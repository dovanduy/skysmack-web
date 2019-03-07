import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiDomain, Package, HttpErrorResponse } from '@skysmack/framework';
import { PackagesRequests, PackagesActions, GetPackageSuccessPayload } from '@skysmack/packages-skysmack-core';
import { Observable, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ReduxAction, PackagePathPayload, GetAvailablePackagesSuccessPayload, GetPagedEntitiesPayload, GetPagedEntitiesSuccessPayload } from '@skysmack/redux';
import { CustomHttpUrlEncodingCodec, PageResponseExtensions } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgPackagesRequests implements PackagesRequests {
    protected retryTimes = 3;

    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
    }

    public getPaged(action: ReduxAction<GetPagedEntitiesPayload>, additionalPaths?: string[]): Observable<ReduxAction<GetPagedEntitiesSuccessPayload<Package, string>> | ReduxAction<HttpErrorResponse>> {
        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        let query = '';
        let sort = '';

        if (action.payload.pagedQuery.rsqlFilter) {
            query = action.payload.pagedQuery.rsqlFilter.toList().build();
            if (query && query.length > 0) {
                queryParameters = queryParameters.set('query', query);
            }
        }

        if (action.payload.pagedQuery.sort) {
            sort = action.payload.pagedQuery.sort.build();
            if (sort && sort.length > 0) {
                queryParameters = queryParameters.set('sort', sort);
            }
        }

        if (action.payload.pagedQuery.pageNumber && action.payload.pagedQuery.pageNumber > 1) {
            queryParameters = queryParameters.set('pageNumber', action.payload.pagedQuery.pageNumber.toString());
        }

        if (action.payload.pagedQuery.pageSize && action.payload.pagedQuery.pageSize > 0) {
            queryParameters = queryParameters.set('pageSize', action.payload.pagedQuery.pageSize.toString());
        }

        const url = `${this.apiDomain.domain}/skysmack/packages`;

        return this.http.get<Package[]>(url, { observe: 'response', params: queryParameters })
            .pipe(
                map(httpResponse => {
                    return Object.assign({}, new ReduxAction<GetPagedEntitiesSuccessPayload<Package, string>>({
                        type: PackagesActions.PACKAGES_GET_PAGED_SUCCESS,
                        payload: {
                            entities: httpResponse.body ? httpResponse.body : [],
                            packagePath: action.payload.packagePath,
                            page: PageResponseExtensions.getPageResponse<string>(httpResponse.headers, httpResponse.body.map(record => record.path), query, sort),
                            pagedQuery: action.payload.pagedQuery
                        }
                    }));
                }),
                retry(this.retryTimes),
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                    type: PackagesActions.PACKAGES_GET_PAGED_FAILURE,
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
