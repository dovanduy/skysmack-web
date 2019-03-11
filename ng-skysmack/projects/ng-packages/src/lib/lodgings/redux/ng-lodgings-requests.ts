import { Lodging } from '@skysmack/packages-lodgings';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDomain, StrIndex, HttpErrorResponse } from '@skysmack/framework';
import { NgRecordRequests } from '@skysmack/ng-redux';
import { Observable, of } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { ReduxAction, StateKeyMeta } from '@skysmack/redux';
import { NgLodgingsActions } from './ng-lodgings-actions';

@Injectable({ providedIn: 'root' })
export class NgLodgingsRequests extends NgRecordRequests<Lodging, number> {
    constructor(
        protected http: HttpClient,
        @Inject('ApiDomain') protected apiDomain: ApiDomain
    ) {
        super(http, apiDomain, 'LODGINGS_', []);
    }

    // TODO: Ensure success return type is correct.
    public getAvailableLodgings(packagePath: string, start: string, end: string): Observable<ReduxAction<StrIndex<StrIndex<number>>> | ReduxAction<HttpErrorResponse>> {
        const url = `${this.apiDomain.domain}/${packagePath}/available/${start}/${end}`;

        // TODO: Append lodging ids
        // http://client1.skysmack-io.test:2000/rooms/types/available-lodgings/2019-03-01/2019-03-31?lodgingTypeIds=1

        return this.http.get<any>(url, { observe: 'response' }).pipe(
            map(httpResponse => Object.assign({}, new ReduxAction<StrIndex<StrIndex<number>>, StateKeyMeta>({
                type: this.prefix + NgLodgingsActions.GET_AVAILABLE_LODGINGS_SUCCESS,
                payload: httpResponse.body,
                meta: {
                    stateKey: packagePath
                }
            }))),
            retry(this.retryTimes),
            catchError((error) => of(Object.assign({}, new ReduxAction<HttpErrorResponse>({
                type: this.prefix + NgLodgingsActions.GET_AVAILABLE_LODGINGS_FAILURE,
                payload: error,
                error: true
            }))))
        );
    }
}
