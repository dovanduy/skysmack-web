import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { LodgingTypeReservationPriceChange, LodgingTypeReservationPriceChangesAppState } from '@skysmack/packages-reservations-pricings';
import { NgRecordStore } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';


@Injectable({ providedIn: 'root' })
export class NgLodgingTypeReservationPriceChangesStore extends NgRecordStore<LodgingTypeReservationPriceChangesAppState, LodgingTypeReservationPriceChange, number> {
    constructor(
        protected ngRedux: NgRedux<LodgingTypeReservationPriceChangesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, 'lodgingTypeReservationPriceChanges'); }
}
