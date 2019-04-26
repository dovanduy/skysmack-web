import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingPrice, LodgingPricesAppState, LODGING_PRICES_AREA_KEY } from '@skysmack/packages-reservations-pricings';
import { NgRecordStore } from '@skysmack/ng-redux';


@Injectable({ providedIn: 'root' })
export class NgLodgingPricesStore extends NgRecordStore<LodgingPricesAppState, LodgingPrice, number> {
    constructor(protected ngRedux: NgRedux<LodgingPricesAppState>) { super(ngRedux, LODGING_PRICES_AREA_KEY); }
}
