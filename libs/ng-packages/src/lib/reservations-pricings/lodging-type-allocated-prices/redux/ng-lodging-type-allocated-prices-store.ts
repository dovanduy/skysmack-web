import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingTypeAllocatedPrice, LodgingTypeAllocatedPricesAppState, LODGING_TYPE_ALLOCATED_PRICES_AREA_KEY } from '@skysmack/packages-reservations-pricings';
import { NgRecordStore } from '@skysmack/ng-redux';


@Injectable({ providedIn: 'root' })
export class NgLodgingTypeAllocatedPricesStore extends NgRecordStore<LodgingTypeAllocatedPricesAppState, LodgingTypeAllocatedPrice, number> {
    constructor(protected ngRedux: NgRedux<LodgingTypeAllocatedPricesAppState>) { super(ngRedux, LODGING_TYPE_ALLOCATED_PRICES_AREA_KEY); }
}
