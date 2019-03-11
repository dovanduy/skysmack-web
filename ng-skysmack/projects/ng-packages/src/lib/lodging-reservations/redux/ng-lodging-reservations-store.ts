import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingReservation, LodgingReservationsAppState } from '@skysmack/packages-lodging-reservations';
import { NgRecordStore } from '@skysmack/ng-redux';


@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsStore extends NgRecordStore<LodgingReservationsAppState, LodgingReservation, number> {
    constructor(protected ngRedux: NgRedux<LodgingReservationsAppState>) { super(ngRedux, 'lodgingReservations'); }
}
