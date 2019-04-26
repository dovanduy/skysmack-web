import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { LodgingTypeAllocatedPricesAppState, LodgingTypeAllocatedPricesActions } from '@skysmack/packages-reservations-pricings';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypeAllocatedPricesActions extends LodgingTypeAllocatedPricesActions {
    constructor(protected store: NgRedux<LodgingTypeAllocatedPricesAppState>) { super(store); }
}
