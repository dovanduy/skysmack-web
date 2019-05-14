import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingReservationPriceChange, LodgingReservationPriceChangesAppState } from '@skysmack/packages-reservations-pricings';
import { NgRecordStore } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';


@Injectable({ providedIn: 'root' })
export class NgLodgingReservationPriceChangesStore extends NgRecordStore<LodgingReservationPriceChangesAppState, LodgingReservationPriceChange, number> {
    constructor(
        protected ngRedux: NgRedux<LodgingReservationPriceChangesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, 'lodgingReservationPriceChanges'); }
}
