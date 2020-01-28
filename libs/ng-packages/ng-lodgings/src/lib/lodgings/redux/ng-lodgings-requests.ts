import { Lodging, LODGINGS_REDUX_KEY, LODGINGS_ADDITIONAL_PATHS } from '@skysmack/packages-lodgings';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, API_DOMAIN_INJECTOR_TOKEN, StrIndex, HttpErrorResponse } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { ReduxAction, GetIntervalPayload, SelectedIdsMeta } from '@skysmack/redux';
import { Observable, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { NgLodgingsActions } from './ng-lodgings-actions';

@Injectable({ providedIn: 'root' })
export class NgLodgingsRequests extends NgRecordRequests<Lodging, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, LODGINGS_REDUX_KEY, LODGINGS_ADDITIONAL_PATHS);
    }

    public getAvailableLodgings(action: ReduxAction<GetIntervalPayload, SelectedIdsMeta<number>>): Observable<ReduxAction<StrIndex<StrIndex<boolean>>> | ReduxAction<HttpErrorResponse>> {
        let url = `${this.apiDomain.domain}/${action.payload.packagePath}/available/${action.payload.start}/${action.payload.end}`;
        url = `${url}?${action.meta.ids.map(id => `lodgingIds=${id}`).join('&')}`;

        return this.http.get<any>(url, { observe: 'response' }).pipe(
            map(httpResponse => Object.assign({}, new ReduxAction<StrIndex<StrIndex<boolean>>, { stateKey: string, dateKey: string, ids: number[] }>({
                type: LODGINGS_REDUX_KEY + NgLodgingsActions.GET_AVAILABLE_LODGINGS_SUCCESS,
                payload: httpResponse.body,
                meta: {
                    stateKey: action.payload.packagePath,
                    dateKey: `${action.payload.start}:${action.payload.end}`,
                    ids: action.meta.ids
                }
            }))),
            retry(3),
            catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                type: LODGINGS_REDUX_KEY + NgLodgingsActions.GET_AVAILABLE_LODGINGS_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }

    public getAvailableLodgingsDaily(action: ReduxAction<GetIntervalPayload, SelectedIdsMeta<number>>): Observable<ReduxAction<StrIndex<StrIndex<number[]>>> | ReduxAction<HttpErrorResponse>> {
        let url = `${this.apiDomain.domain}/${action.payload.packagePath}/available/daily/${action.payload.start}/${action.payload.end}`;
        url = `${url}?${action.meta.ids.map(id => `lodgingIds=${id}`).join('&')}`;

        return this.http.get<any>(url, { observe: 'response' }).pipe(
            map(httpResponse => Object.assign({}, new ReduxAction<StrIndex<StrIndex<number[]>>, { stateKey: string, ids: number[] }>({
                type: LODGINGS_REDUX_KEY + NgLodgingsActions.GET_AVAILABLE_LODGINGS_DAILY_SUCCESS,
                payload: httpResponse.body,
                meta: {
                    stateKey: action.payload.packagePath,
                    ids: action.meta.ids
                }
            }))),
            retry(3),
            catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                type: LODGINGS_REDUX_KEY + NgLodgingsActions.GET_AVAILABLE_LODGINGS_DAILY_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }
}
