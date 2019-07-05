import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingTypeReservationPriceChange, LodgingTypeReservationPriceChangesAppState, LODGING_TYPE_RESERVATION_PRICE_CHANGES_REDUCER_KEY } from '@skysmack/packages-reservations-pricings';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';


@Injectable({ providedIn: 'root' })
export class NgLodgingTypeReservationPriceChangesStore extends NgRecordStore<LodgingTypeReservationPriceChangesAppState, LodgingTypeReservationPriceChange, number> {
    constructor(
        protected ngRedux: NgRedux<LodgingTypeReservationPriceChangesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, LODGING_TYPE_RESERVATION_PRICE_CHANGES_REDUCER_KEY); }
}
