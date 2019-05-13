import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingTypePrice, LodgingTypePricesAppState } from '@skysmack/packages-reservations-pricings';
import { NgRecordStore } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';


@Injectable({ providedIn: 'root' })
export class NgLodgingTypePricesStore extends NgRecordStore<LodgingTypePricesAppState, LodgingTypePrice, number> {
    constructor(
        protected ngRedux: NgRedux<LodgingTypePricesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, 'lodgingTypePrices'); }
}
