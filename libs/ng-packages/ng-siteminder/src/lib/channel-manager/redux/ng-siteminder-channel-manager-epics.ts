import { Injectable } from '@angular/core';
import { Epic, ActionsObservable, ofType } from 'redux-observable';
import { NgSiteMinderChannelManagerRequests } from './ng-siteminder-channel-manager-requests';
import { ReduxAction } from '@skysmack/redux';
import { mergeMap } from 'rxjs/operators';
import { SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY, GetAvailabilityPayload, GetAvailabilitySuccessPayload, GetRatesPayload, GetRatesSuccessPayload } from '@skysmack/packages-siteminder';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@skysmack/framework';
import { NgSiteMinderChannelManagerActions } from './ng-siteminder-channel-manager-actions';


@Injectable({ providedIn: 'root' })
export class NgSiteMinderChannelManagerEpics {
    public epics: Epic[];

    constructor(protected requests: NgSiteMinderChannelManagerRequests) {
        this.epics = [
            this.getAvailabilityEpic
        ];
    }

    public getAvailabilityEpic = (action$: ActionsObservable<ReduxAction<GetAvailabilityPayload>>): Observable<ReduxAction<GetAvailabilitySuccessPayload> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + NgSiteMinderChannelManagerActions.GET_AVAILABILITY),
            mergeMap(action => this.requests.getAvailability(action))
        );
    }

    public getRatesEpic = (action$: ActionsObservable<ReduxAction<GetRatesPayload>>): Observable<ReduxAction<GetRatesSuccessPayload> | ReduxAction<HttpErrorResponse>> => {
        return action$.pipe(
            ofType(SITE_MINDER_CHANNEL_MANAGER_REDUX_KEY + NgSiteMinderChannelManagerActions.GET_RATES),
            mergeMap(action => this.requests.getRates(action))
        );
    }
}
