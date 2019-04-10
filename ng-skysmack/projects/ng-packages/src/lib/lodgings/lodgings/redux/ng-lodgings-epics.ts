import { RecordEpicsBase } from '@skysmack/ng-redux';
import { Lodging, LodgingsActions, LODGINGS_REDUX_KEY } from '@skysmack/packages-lodgings';
import { Injectable } from '@angular/core';
import { NgLodgingsRequests } from './ng-lodgings-requests';
import { NgLodgingsNotifications } from '../ng-lodgings-notifications';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { ReduxAction, GetIntervalPayload, SelectedIdsMeta } from '@skysmack/redux';
import { StrIndex, HttpErrorResponse } from '@skysmack/framework';
import { switchMap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class NgLodgingsEpics extends RecordEpicsBase<Lodging, number> {
    constructor(
        protected requests: NgLodgingsRequests,
        protected notifications: NgLodgingsNotifications
    ) {
        super(requests, LODGINGS_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            this.getAvailableLodgingsEpic,
        ]);
    }

    public getAvailableLodgingsEpic = (action$: ActionsObservable<any>): Observable<ReduxAction<StrIndex<StrIndex<number[]>>> | ReduxAction<HttpErrorResponse>> => action$.pipe(
        ofType(LodgingsActions.GET_AVAILABLE_LODGINGS),
        switchMap((action: ReduxAction<GetIntervalPayload, SelectedIdsMeta<number>>) => this.requests.getAvailableLodgings(action))
    )
}