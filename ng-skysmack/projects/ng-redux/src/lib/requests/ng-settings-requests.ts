import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, HttpErrorResponse } from '@skysmack/framework';
import { catchError, map, retry } from 'rxjs/operators';
import { ReduxAction, SettingsActions, GetSettingsPayload, SettingsSuccessPayload } from '@skysmack/redux';
import { of, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgSettingsRequests {
    protected retryTimes = 3;

    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) { }

    public get(action: ReduxAction<GetSettingsPayload>): Observable<ReduxAction<SettingsSuccessPayload> | ReduxAction<HttpErrorResponse>> {
        const url = `${this.apiDomain.domain}/${action.payload.packagePath}/settings/${action.payload.settingKey}`;

        return this.http.get(url, { observe: 'response' })
            .pipe(
                map(httpResponse => {
                    return Object.assign({}, new ReduxAction<SettingsSuccessPayload>({
                        type: SettingsActions.GET_SETTINGS_SUCCESS,
                        payload: {
                            settings: httpResponse.body ? httpResponse.body : {},
                            packagePath: action.payload.packagePath,
                            settingsKey: action.payload.settingKey
                        }
                    }));
                }),
                retry(this.retryTimes),
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                    type: SettingsActions.GET_SETTINGS_FAILURE,
                    payload: error,
                    error: true
                }))))
            );
    }

}
