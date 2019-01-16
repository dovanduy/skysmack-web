import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingReservation, LodgingReservationsAppState } from '@skysmack/packages-lodging-reservations';
import { NgRecordReduxStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsStore extends NgRecordReduxStore<LodgingReservationsAppState, LodgingReservation, number> {
    constructor(protected ngRedux: NgRedux<LodgingReservationsAppState>) { super(ngRedux, 'lodging-reservations'); }

    // public getLodgingReservationRoles(packagePath: string, id: number): Observable<string[]> {
    //     return this.getState<LodgingReservationsState>().pipe(
    //         map(state => state.lodging - reservationsRoles),
    //         defined(),
    //         map(lodging - reservationsRoles => lodging - reservationsRoles[packagePath]),
    //         defined(),
    //         map(userRolesDictionary => userRolesDictionary[id]),
    //         defined()
    //     );
    // }
}
