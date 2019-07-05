import { RecordEpicsBase } from '@skysmack/ng-framework';
import { LODGING_TYPE_RESERVATION_PRICE_CHANGES_REDUX_KEY, LodgingTypeReservationPriceChange } from '@skysmack/packages-reservations-pricings';
import { Injectable } from '@angular/core';
import { getReadDependencies } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgLodgingsStore } from '../../../lodgings/lodgings/redux/ng-lodgings-store';
import { NgLodgingsActions } from '../../../lodgings/lodgings/redux/ng-lodgings-actions';
import { NgLodgingTypeReservationPriceChangesRequests } from './ng-lodging-type-reservation-price-changes-requests';
import { NgLodgingTypeReservationPriceChangesNotifications } from '../ng-lodging-type-reservation-price-changes-notifications';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypeReservationPriceChangesEpics extends RecordEpicsBase<LodgingTypeReservationPriceChange, number> {
    constructor(
        protected requests: NgLodgingTypeReservationPriceChangesRequests,
        protected notifications: NgLodgingTypeReservationPriceChangesNotifications,
        protected skysmackStore: NgSkysmackStore,
        protected lodgingsStore: NgLodgingsStore,
        protected lodgingsActions: NgLodgingsActions
    ) {
        super(requests, LODGING_TYPE_RESERVATION_PRICE_CHANGES_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: LODGING_TYPE_RESERVATION_PRICE_CHANGES_REDUX_KEY,
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
