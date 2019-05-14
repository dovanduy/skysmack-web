import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingTypeAllocatedPrice, LodgingTypeAllocatedPricesAppState, LODGING_TYPE_ALLOCATED_PRICES_REDUCER_KEY } from '@skysmack/packages-reservations-pricings';
import { NgRecordStore } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';


@Injectable({ providedIn: 'root' })
export class NgLodgingTypeAllocatedPricesStore extends NgRecordStore<LodgingTypeAllocatedPricesAppState, LodgingTypeAllocatedPrice, number> {
    constructor(
        protected ngRedux: NgRedux<LodgingTypeAllocatedPricesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, LODGING_TYPE_ALLOCATED_PRICES_REDUCER_KEY); }
}
