import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, HttpErrorResponse } from '@skysmack/framework';
import { ReduxAction } from '@skysmack/redux';
import { Observable, of } from 'rxjs';
import { Assignment, AssignmentsActions } from '@skysmack/packages-maintenance';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgAssignmentsRequests {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) { }


    public get(action: ReduxAction<{ packagePath: string, from: Date, due: Date }>): Observable<ReduxAction<any> | ReduxAction<HttpErrorResponse>> {
        let url = `${this.apiDomain.domain}/${action.payload.packagePath}?from=${encodeURIComponent(action.payload.from.toISOString()).split('Z')[0]}&to=${encodeURIComponent(action.payload.due.toISOString()).split('Z')[0]}`;
        return this.http.get<Assignment[]>(url, { observe: 'response' })
            .pipe(
                map(httpResponse => {
                    return Object.assign({}, new ReduxAction<any>({
                        type: AssignmentsActions.ASSIGNMENTS_GET_SUCCESS,
                        payload: {
                            entities: httpResponse.body,
                            ...action.payload
                        }
                    }));
                }),
                retry(3),
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                    type: AssignmentsActions.ASSIGNMENTS_GET_FAILURE,
                    payload: error,
                    error: true
                }))))
            );
    }
}
