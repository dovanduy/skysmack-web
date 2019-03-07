import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, HttpErrorResponse } from '@skysmack/framework';
import { catchError, map, retry } from 'rxjs/operators';
import { ReduxAction } from '@skysmack/redux';
import { of, Observable } from 'rxjs';
import { IdentitiesSettings, IdentitiesSettingsActions } from '@skysmack/packages-identities';

@Injectable({ providedIn: 'root' })
export class NgIdentitiesSettingsRequests {
    protected retryTimes = 3;

    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) { }

    public get(action: ReduxAction<any>): Observable<ReduxAction<any> | ReduxAction<HttpErrorResponse>> {
        const url = `${this.apiDomain.domain}/${action.payload.packagePath}/settings`;

        return this.http.get<IdentitiesSettings>(url, { observe: 'response' })
            .pipe(
                map(httpResponse => {
                    return Object.assign({}, new ReduxAction<any>({
                        type: IdentitiesSettingsActions.GET_IDENTITY_SETTINGS_SUCCESS,
                        payload: {
                            settings: httpResponse.body ? httpResponse.body : {},
                            packagePath: action.payload.packagePath,
                        }
                    }));
                }),
                retry(this.retryTimes),
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                    type: IdentitiesSettingsActions.GET_IDENTITY_SETTINGS_FAILURE,
                    payload: error,
                    error: true
                }))))
            );
    }

}
