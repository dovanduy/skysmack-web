import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingReservation, LodgingReservationsAppState } from '@skysmack/packages-lodging-reservations';
import { NgRecordReduxStore } from '@skysmack/ng-redux';
import { Observable } from 'rxjs';
import { StrIndex, defined } from '@skysmack/framework';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsStore extends NgRecordReduxStore<LodgingReservationsAppState, LodgingReservation, number> {
    constructor(protected ngRedux: NgRedux<LodgingReservationsAppState>) { super(ngRedux, 'lodgingReservations'); }

    public getAvailableLodgings(packagePath: string): Observable<StrIndex<StrIndex<number>>> {
        return this.ngRedux.select(state => state.lodgingReservations).pipe(
            map(lodgingRerservationState => lodgingRerservationState.availableLodgings[packagePath]),
            defined()
        );
    }
}
