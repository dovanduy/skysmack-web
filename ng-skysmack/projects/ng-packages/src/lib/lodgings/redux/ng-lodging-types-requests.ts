import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, StrIndex, HttpErrorResponse } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-redux';
import { Lodging, SelectedLodgingIdsMeta } from '@skysmack/packages-lodgings';
import { ReduxAction, GetIntervalPayload, StateKeyMeta } from '@skysmack/redux';
import { Observable, of } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypesRequests extends NgRecordRequests<Lodging, number> {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'LODGING_TYPES_', ['types']);
    }

    public getAvailableLodgings(action: ReduxAction<GetIntervalPayload, SelectedLodgingIdsMeta>): Observable<ReduxAction<StrIndex<StrIndex<number>>> | ReduxAction<HttpErrorResponse>> {
        let url = `${this.apiDomain.domain}/${action.payload.packagePath}/types/available-lodgings/daily/${action.payload.start}/${action.payload.end}`;
        url = `${url}?${action.meta.lodgingIds.map(id => `lodgingIds=${id}`).join('&')}`;

        return this.http.get<any>(url, { observe: 'response' }).pipe(
            map(httpResponse => Object.assign({}, new ReduxAction<StrIndex<StrIndex<number>>, StateKeyMeta>({
                type: this.prefix + NgLodgingTypesRequests.GET_AVAILABLE_LODGINGS_SUCCESS,
                payload: httpResponse.body,
                meta: {
                    stateKey: action.payload.packagePath
                }
            }))),
            retry(this.retryTimes),
            catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                type: this.prefix + NgLodgingTypesRequests.GET_AVAILABLE_LODGINGS_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }
}
