import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingPricesAppState, LodgingPricesActions } from '@skysmack/packages-reservations-pricings';

@Injectable({ providedIn: 'root' })
export class NgLodgingPricesActions extends LodgingPricesActions {
    constructor(protected store: NgRedux<LodgingPricesAppState>) { super(store); }
}
