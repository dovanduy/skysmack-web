import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingPrice, LodgingPricesAppState, LODGING_PRICES_REDUCER_KEY } from '@skysmack/packages-reservations-pricings';
import { NgRecordStore } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';


@Injectable({ providedIn: 'root' })
export class NgLodgingPricesStore extends NgRecordStore<LodgingPricesAppState, LodgingPrice, number> {
    constructor(
        protected ngRedux: NgRedux<LodgingPricesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, LODGING_PRICES_REDUCER_KEY); }
}
