import { RecordEpicsBase } from '@skysmack/ng-redux';
import { LodgingType, LodgingTypesActions } from '@skysmack/packages-lodgings';
import { Injectable } from '@angular/core';
import { NgLodgingTypesRequests } from './ng-lodging-types-requests';
import { NgLodgingTypesNotifications } from '../ng-lodging-types-notifications';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { ReduxAction, GetIntervalPayload, SelectedIdsMeta } from '@skysmack/redux';
import { StrIndex, HttpErrorResponse } from '@skysmack/framework';
import { switchMap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class NgLodgingTypesEpics extends RecordEpicsBase<LodgingType, number> {
    constructor(
        protected requests: NgLodgingTypesRequests,
        protected notifications: NgLodgingTypesNotifications
    ) {
        super(requests, 'LODGING_TYPES_', notifications);
        this.epics = this.epics.concat([
            this.getAvailableLodgingTypesEpic
        ]);
    }


    public getAvailableLodgingTypesEpic = (action$: ActionsObservable<any>): Observable<ReduxAction<StrIndex<StrIndex<number[]>>> | ReduxAction<HttpErrorResponse>> => action$.pipe(
        ofType(LodgingTypesActions.GET_AVAILABLE_LODGING_TYPES),
        switchMap((action: ReduxAction<GetIntervalPayload, SelectedIdsMeta<number>>) => this.requests.getAvailableLodgingTypes(action))
    )
}