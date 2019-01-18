import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingReservationsAppState, LodgingReservationsActions } from '@skysmack/packages-lodging-reservations';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationsActions extends LodgingReservationsActions {
    constructor(protected store: NgRedux<LodgingReservationsAppState>) { super(store); }
}
