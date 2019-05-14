import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingReservationPriceChangesAppState, LodgingReservationPriceChangesActions } from '@skysmack/packages-reservations-pricings';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationPriceChangesActions extends LodgingReservationPriceChangesActions {
    constructor(protected store: NgRedux<LodgingReservationPriceChangesAppState>) { super(store); }
}
