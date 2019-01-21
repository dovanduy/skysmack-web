import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiDomain, StrIndex } from '@skysmack/framework';
import { LodgingReservation } from '@skysmack/packages-lodging-reservations';
import { NgRecordRequests } from '@skysmack/ng-redux';
import { Observable, of } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { ReduxAction, StateKeyMeta } from '@skysmack/redux';
import { NgLodgingReservationsActions } from './ng-lodging-reservations-actions';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsRequests extends NgRecordRequests<LodgingReservation, number> {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'LODGING_RESERVATIONS_', []);
    }


    // TODO: Ensure success return type is correct.
    public getAvailableLodgings(packagePath: string, start: string, end: string): Observable<ReduxAction<StrIndex<StrIndex<number>>> | ReduxAction<HttpErrorResponse>> {
        const url = `${this.apiDomain.domain}/${packagePath}/available/${start}/${end}`;
        return this.http.get<any>(url, { observe: 'response' }).pipe(
            map(httpResponse => Object.assign({}, new ReduxAction<StrIndex<StrIndex<number>>, StateKeyMeta>({
                type: this.prefix + NgLodgingReservationsActions.GET_AVAILABLE_LODGINGS_SUCCESS,
                payload: httpResponse.body,
                meta: {
                    stateKey: packagePath
                }
            }))),
            retry(this.retryTimes),
            catchError((error) => of(Object.assign({}, new ReduxAction({
                type: this.prefix + NgLodgingReservationsActions.GET_AVAILABLE_LODGINGS_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }
}
