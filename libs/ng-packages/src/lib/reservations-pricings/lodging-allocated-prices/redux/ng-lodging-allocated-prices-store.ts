import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingAllocatedPrice, LodgingAllocatedPricesAppState } from '@skysmack/packages-reservations-pricings';
import { NgRecordStore } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';


@Injectable({ providedIn: 'root' })
export class NgLodgingAllocatedPricesStore extends NgRecordStore<LodgingAllocatedPricesAppState, LodgingAllocatedPrice, number> {
    constructor(
        protected ngRedux: NgRedux<LodgingAllocatedPricesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, 'lodgingAllocatedPrices'); }
}
