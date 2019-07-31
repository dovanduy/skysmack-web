import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingTypePricesAppState, LodgingTypePricesActions } from '@skysmack/packages-reservations-pricings';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypePricesActions extends LodgingTypePricesActions {
    constructor(protected store: NgRedux<LodgingTypePricesAppState>) { super(store); }
}
