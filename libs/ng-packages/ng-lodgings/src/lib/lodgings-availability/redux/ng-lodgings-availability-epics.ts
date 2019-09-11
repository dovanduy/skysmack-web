import { LodgingsActions } from '@skysmack/packages-lodgings';
import { Injectable } from '@angular/core';
import { ActionsObservable, ofType, Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { ReduxAction, GetIntervalPayload, SelectedIdsMeta } from '@skysmack/redux';
import { StrIndex, HttpErrorResponse } from '@skysmack/framework';
import { switchMap } from 'rxjs/operators';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgLodgingsAvailabilityRequests } from './ng-lodgings-availability-requests';


@Injectable({ providedIn: 'root' })
export class NgLodgingsAvailabilityEpics {
    public epics: Epic[];

    constructor(
        protected requests: NgLodgingsAvailabilityRequests,
        protected skysmackStore: NgSkysmackStore
    ) {
        this.epics = [
            this.getAvailableLodgingsEpic,
            this.getAvailableLodgingsDailyEpic
        ];
    }

    public getAvailableLodgingsEpic = (action$: ActionsObservable<any>): Observable<ReduxAction<StrIndex<StrIndex<boolean>>> | ReduxAction<HttpErrorResponse>> => action$.pipe(
        ofType(LodgingsActions.GET_AVAILABLE_LODGINGS),
        switchMap((action: ReduxAction<GetIntervalPayload, SelectedIdsMeta<number>>) => this.requests.getAvailableLodgings(action))
    )

    public getAvailableLodgingsDailyEpic = (action$: ActionsObservable<any>): Observable<ReduxAction<StrIndex<StrIndex<number[]>>> | ReduxAction<HttpErrorResponse>> => action$.pipe(
        ofType(LodgingsActions.GET_AVAILABLE_LODGINGS_DAILY),
        switchMap((action: ReduxAction<GetIntervalPayload, SelectedIdsMeta<number>>) => this.requests.getAvailableLodgingsDaily(action))
    )
}
