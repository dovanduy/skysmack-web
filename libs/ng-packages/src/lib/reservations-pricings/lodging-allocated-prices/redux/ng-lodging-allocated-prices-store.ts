import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingAllocatedPrice, LodgingAllocatedPricesAppState, LODGING_ALLOCATED_PRICES_AREA_KEY } from '@skysmack/packages-reservations-pricings';
import { NgRecordStore } from '@skysmack/ng-redux';


@Injectable({ providedIn: 'root' })
export class NgLodgingAllocatedPricesStore extends NgRecordStore<LodgingAllocatedPricesAppState, LodgingAllocatedPrice, number> {
    constructor(protected ngRedux: NgRedux<LodgingAllocatedPricesAppState>) { super(ngRedux, LODGING_ALLOCATED_PRICES_AREA_KEY); }
}
