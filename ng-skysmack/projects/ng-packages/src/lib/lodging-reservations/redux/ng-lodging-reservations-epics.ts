import { RecordEpicsBase } from '@skysmack/ng-redux';
import { LodgingReservation, LodgingReservationsActions } from '@skysmack/packages-lodging-reservations';
import { NgLodgingReservationsRequests } from './ng-lodging-reservations-requests';
import { Injectable } from '@angular/core';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@skysmack/framework';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsEpics extends RecordEpicsBase<LodgingReservation, number> {
    constructor(protected requests: NgLodgingReservationsRequests) {
        super(requests, 'LODGING_RESERVATIONS_');
        this.epics = this.epics.concat([
            this.getAvailableLodgingsEpic
        ]);
    }

    // TODO: Set proper return type.
    public getAvailableLodgingsEpic = (action$: ActionsObservable<any>): Observable<any | HttpErrorResponse> => action$.pipe(
        ofType(LodgingReservationsActions.GET_AVAILABLE_LODGINGS),
        switchMap((action) => this.requests.getAvailableLodgings(
            action.payload.path,
            action.payload.start,
            action.payload.end
        ))
    )
}
