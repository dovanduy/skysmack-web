import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, StrIndex, HttpErrorResponse, API_DOMAIN_INJECTOR_TOKEN } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-framework';
import { Lodging, LODGING_TYPES_ADDITIONAL_PATHS, LODGING_TYPES_REDUX_KEY } from '@skysmack/packages-lodgings';
import { ReduxAction, GetIntervalPayload, StateKeyMeta, SelectedIdsMeta } from '@skysmack/redux';
import { Observable, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { NgLodgingTypesActions } from './ng-lodging-types-actions';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesRequests extends NgRecordRequests<Lodging, number> {
    constructor(
        protected http: HttpClient,
        @Inject(API_DOMAIN_INJECTOR_TOKEN) protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, LODGING_TYPES_REDUX_KEY, LODGING_TYPES_ADDITIONAL_PATHS);
    }

    public getAvailableLodgingTypes(action: ReduxAction<GetIntervalPayload, SelectedIdsMeta<number>>): Observable<ReduxAction<StrIndex<StrIndex<number[]>>> | ReduxAction<HttpErrorResponse>> {
        let url = `${this.apiDomain.domain}/${action.payload.packagePath}/types/available-lodgings/daily/${action.payload.start}/${action.payload.end}`;
        url = `${url}?${action.meta.ids.map(id => `lodgingTypeIds=${id}`).join('&')}`;

        return this.http.get<any>(url, { observe: 'response' }).pipe(
            map(httpResponse => Object.assign({}, new ReduxAction<StrIndex<StrIndex<number[]>>, StateKeyMeta>({
                type: this.prefix + NgLodgingTypesActions.GET_AVAILABLE_LODGING_TYPES_SUCCESS,
                payload: httpResponse.body,
                meta: {
                    stateKey: action.payload.packagePath
                }
            }))),
            retry(this.retryTimes),
            catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                type: this.prefix + NgLodgingTypesActions.GET_AVAILABLE_LODGING_TYPES_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }

    public getAvailableLodgingTypesCount(action: ReduxAction<GetIntervalPayload, SelectedIdsMeta<number>>): Observable<ReduxAction<StrIndex<StrIndex<number>>> | ReduxAction<HttpErrorResponse>> {
        let url = `${this.apiDomain.domain}/${action.payload.packagePath}/types/available-lodgings/daily-count/${action.payload.start}/${action.payload.end}`;
        url = `${url}?${action.meta.ids.map(id => `lodgingTypeIds=${id}`).join('&')}`;

        return this.http.get<any>(url, { observe: 'response' }).pipe(
            map(httpResponse => Object.assign({}, new ReduxAction<StrIndex<StrIndex<number>>, StateKeyMeta>({
                type: this.prefix + NgLodgingTypesActions.GET_AVAILABLE_LODGING_TYPES_COUNT_SUCCESS,
                payload: httpResponse.body,
                meta: {
                    stateKey: action.payload.packagePath
                }
            }))),
            retry(this.retryTimes),
            catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                type: this.prefix + NgLodgingTypesActions.GET_AVAILABLE_LODGING_TYPES_COUNT_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }
}
