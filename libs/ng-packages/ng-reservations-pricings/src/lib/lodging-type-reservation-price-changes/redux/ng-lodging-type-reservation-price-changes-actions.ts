import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingTypeReservationPriceChangesAppState, LodgingTypeReservationPriceChangesActions } from '@skysmack/packages-reservations-pricings';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypeReservationPriceChangesActions extends LodgingTypeReservationPriceChangesActions {
    constructor(protected store: NgRedux<LodgingTypeReservationPriceChangesAppState>) { super(store); }
}
