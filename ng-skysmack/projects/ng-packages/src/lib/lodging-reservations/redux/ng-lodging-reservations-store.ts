import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingReservation, LodgingReservationsAppState } from '@skysmack/packages-lodging-reservations';
import { NgRecordReduxStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsStore extends NgRecordReduxStore<LodgingReservationsAppState, LodgingReservation, number> {
    constructor(protected ngRedux: NgRedux<LodgingReservationsAppState>) { super(ngRedux, 'lodgingReservations'); }

    public getAvailableLodgings(path: string, start: string, end: string) {
        // create correct selector
    }
}
