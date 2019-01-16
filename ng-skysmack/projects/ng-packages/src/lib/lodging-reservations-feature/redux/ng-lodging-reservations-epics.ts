import { RecordEpicsBase } from '@skysmack/ng-redux';
import { LodgingReservation, GetLodgingReservationsRolesPayload, GetLodgingReservationsRolesSuccessPayload } from '@skysmack/packages-lodging-reservations-feature';
import { ActionsObservable, ofType } from 'redux-observable';
import { ReduxAction } from '@skysmack/redux';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@skysmack/framework';
import { NgLodgingReservationsRequests } from './ng-lodging-reservations-requests';
import { NgLodgingReservationsActions } from './ng-lodging-reservations-actions';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsEpics extends RecordEpicsBase<LodgingReservation, number> {
    constructor(protected requests: NgLodgingReservationsRequests) {
        super(requests, 'LODGING_RESERVATIONS_');
        this.epics = this.epics.concat([
            // this.getLodgingReservationsRolesEpic
        ]);
    }

    // public getLodgingReservationsRolesEpic = (action$: ActionsObservable<ReduxAction<GetLodgingReservationsRolesPayload>>): Observable<ReduxAction<GetLodgingReservationsRolesSuccessPayload> | ReduxAction<HttpErrorResponse>> => {
    //     return action$.pipe(
    //         ofType(this.prefix + NgLodgingReservationsActions.GET_ROLES),
    //         switchMap((action: ReduxAction<GetLodgingReservationsRolesPayload>) => this.requests.getLodgingReservationsRoles(action.payload.packagePath, action.payload.ids))
    //     );
    // }
}
