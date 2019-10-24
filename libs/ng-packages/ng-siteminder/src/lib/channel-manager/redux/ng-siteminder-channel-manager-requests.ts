import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, HttpErrorResponse } from '@skysmack/framework';
import { GetAvailabilityPayload, LodgingTypeAvailability, SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY, GetAvailabilitySuccessPayload, GetRatesPayload, GetRatesSuccessPayload, LodgingTypeRate } from '@skysmack/packages-siteminder';
import { ReduxAction } from '@skysmack/redux';
import { Observable, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { NgSiteMinderChannelManagerActions } from './ng-siteminder-channel-manager-actions';

@Injectable({ providedIn: 'root' })
export class NgSiteMinderChannelManagerRequests {
    private retryTimes = 3;

    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) { }

    public getAvailability(action: ReduxAction<GetAvailabilityPayload>): Observable<ReduxAction<GetAvailabilitySuccessPayload> | ReduxAction<HttpErrorResponse>> {
        let url = `${this.apiDomain.domain}/${action.payload.packagePath}`;

        return this.http.get<LodgingTypeAvailability[]>(url, { observe: 'response' })
            .pipe(
                map(httpResponse => {
                    return Object.assign({}, new ReduxAction<GetAvailabilitySuccessPayload>({
                        type: SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + NgSiteMinderChannelManagerActions.GET_AVAILABILITY_FAILURE,
                        payload: {
                            entities: httpResponse.body,
                            ...action.payload
                        }
                    }));
                }),
                retry(this.retryTimes),
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                    type: SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + NgSiteMinderChannelManagerActions.GET_AVAILABILITY_FAILURE,
                    payload: error,
                    error: true
                }))))
            );
    }

    public getRates(action: ReduxAction<GetRatesPayload>): Observable<ReduxAction<GetRatesSuccessPayload> | ReduxAction<HttpErrorResponse>> {
        let url = `${this.apiDomain.domain}/${action.payload.packagePath}`;

        return this.http.get<LodgingTypeRate[]>(url, { observe: 'response' })
            .pipe(
                map(httpResponse => {
                    return Object.assign({}, new ReduxAction<GetRatesSuccessPayload>({
                        type: SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + NgSiteMinderChannelManagerActions.GET_RATES_FAILURE,
                        payload: {
                            entities: httpResponse.body,
                            ...action.payload
                        }
                    }));
                }),
                retry(this.retryTimes),
                catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                    type: SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + NgSiteMinderChannelManagerActions.GET_RATES_FAILURE,
                    payload: error,
                    error: true
                }))))
            );
    }
}
