import { LODGINGS_AVAILABILITY_REDUX_KEY } from '@skysmack/packages-lodgings';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, StrIndex, HttpErrorResponse, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { Observable, of } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { ReduxAction, StateKeyMeta, GetIntervalPayload, SelectedIdsMeta } from '@skysmack/redux';
import { NgLodgingsAvailabilityActions } from './ng-lodgings-availability-actions';

@Injectable({ providedIn: 'root' })
export class NgLodgingsAvailabilityRequests {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
    }

    public getAvailableLodgings(action: ReduxAction<GetIntervalPayload, SelectedIdsMeta<number>>): Observable<ReduxAction<StrIndex<StrIndex<boolean>>> | ReduxAction<HttpErrorResponse>> {
        let url = `${this.apiDomain.domain}/${action.payload.packagePath}/available/${action.payload.start}/${action.payload.end}`;
        url = `${url}?${action.meta.ids.map(id => `lodgingIds=${id}`).join('&')}`;

        return this.http.get<any>(url, { observe: 'response' }).pipe(
            map(httpResponse => Object.assign({}, new ReduxAction<StrIndex<StrIndex<boolean>>, { stateKey: string, dateKey: string }>({
                type: LODGINGS_AVAILABILITY_REDUX_KEY + NgLodgingsAvailabilityActions.GET_AVAILABLE_LODGINGS_SUCCESS,
                payload: httpResponse.body,
                meta: {
                    stateKey: action.payload.packagePath,
                    dateKey: `${action.payload.start}:${action.payload.end}`
                }
            }))),
            retry(3),
            catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                type: LODGINGS_AVAILABILITY_REDUX_KEY + NgLodgingsAvailabilityActions.GET_AVAILABLE_LODGINGS_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }

    public getAvailableLodgingsDaily(action: ReduxAction<GetIntervalPayload, SelectedIdsMeta<number>>): Observable<ReduxAction<StrIndex<StrIndex<number[]>>> | ReduxAction<HttpErrorResponse>> {
        let url = `${this.apiDomain.domain}/${action.payload.packagePath}/available/daily/${action.payload.start}/${action.payload.end}`;
        url = `${url}?${action.meta.ids.map(id => `lodgingIds=${id}`).join('&')}`;

        return this.http.get<any>(url, { observe: 'response' }).pipe(
            map(httpResponse => Object.assign({}, new ReduxAction<StrIndex<StrIndex<number[]>>, StateKeyMeta>({
                type: LODGINGS_AVAILABILITY_REDUX_KEY + NgLodgingsAvailabilityActions.GET_AVAILABLE_LODGINGS_DAILY_SUCCESS,
                payload: httpResponse.body,
                meta: {
                    stateKey: action.payload.packagePath
                }
            }))),
            retry(3),
            catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                type: LODGINGS_AVAILABILITY_REDUX_KEY + NgLodgingsAvailabilityActions.GET_AVAILABLE_LODGINGS_DAILY_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }
}
