import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingTypePrice, LodgingTypePricesAppState, LODGING_TYPE_PRICES_AREA_KEY } from '@skysmack/packages-reservations-pricings';
import { NgRecordStore } from '@skysmack/ng-redux';


@Injectable({ providedIn: 'root' })
export class NgLodgingTypePricesStore extends NgRecordStore<LodgingTypePricesAppState, LodgingTypePrice, number> {
    constructor(protected ngRedux: NgRedux<LodgingTypePricesAppState>) { super(ngRedux, LODGING_TYPE_PRICES_AREA_KEY); }
}
