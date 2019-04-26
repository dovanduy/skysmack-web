import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingAllocatedPricesAppState, LodgingAllocatedPricesActions } from '@skysmack/packages-reservations-pricings';

@Injectable({ providedIn: 'root' })
export class NgLodgingAllocatedPricesActions extends LodgingAllocatedPricesActions {
    constructor(protected store: NgRedux<LodgingAllocatedPricesAppState>) { super(store); }
}
