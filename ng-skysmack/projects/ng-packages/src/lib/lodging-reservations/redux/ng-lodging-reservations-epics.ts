import { RecordEpicsBase } from '@skysmack/ng-redux';
import { LodgingReservation } from '@skysmack/packages-lodging-reservations';
import { NgLodgingReservationsRequests } from './ng-lodging-reservations-requests';
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
