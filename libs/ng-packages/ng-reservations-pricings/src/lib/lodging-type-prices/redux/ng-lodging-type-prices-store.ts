import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingTypePrice, LodgingTypePricesAppState, LODGING_TYPE_PRICES_REDUCER_KEY } from '@skysmack/packages-reservations-pricings';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';


@Injectable({ providedIn: 'root' })
export class NgLodgingTypePricesStore extends NgRecordStore<LodgingTypePricesAppState, LodgingTypePrice, number> {
    constructor(
        protected ngRedux: NgRedux<LodgingTypePricesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, LODGING_TYPE_PRICES_REDUCER_KEY); }
}
