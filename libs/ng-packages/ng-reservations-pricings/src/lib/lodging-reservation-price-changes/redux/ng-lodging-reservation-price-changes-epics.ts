import { RecordEpicsBase } from '@skysmack/ng-framework';
import { LODGING_RESERVATION_PRICE_CHANGES_REDUX_KEY, LodgingReservationPriceChange } from '@skysmack/packages-reservations-pricings';
import { Injectable } from '@angular/core';
import { getReadDependencies } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgLodgingReservationPriceChangesRequests } from './ng-lodging-reservation-price-changes-requests';
import { NgLodgingReservationPriceChangesNotifications } from '../ng-lodging-reservation-price-changes-notifications';
import { NgLodgingsStore, NgLodgingsActions } from '@skysmack/ng-lodgings';

@Injectable({ providedIn: 'root' })
export class NgLodgingReservationPriceChangesEpics extends RecordEpicsBase<LodgingReservationPriceChange, number> {
    constructor(
        protected requests: NgLodgingReservationPriceChangesRequests,
        protected notifications: NgLodgingReservationPriceChangesNotifications,
        protected skysmackStore: NgSkysmackStore,
        protected lodgingsStore: NgLodgingsStore,
        protected lodgingsActions: NgLodgingsActions
    ) {
        super(requests, LODGING_RESERVATION_PRICE_CHANGES_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: LODGING_RESERVATION_PRICE_CHANGES_REDUX_KEY,
                relationIdSelector: 'recordId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.lodgingsStore,
                actions: this.lodgingsActions,
                dependencyIndexes: [0, 0]
            })
        ]);
    }
}
