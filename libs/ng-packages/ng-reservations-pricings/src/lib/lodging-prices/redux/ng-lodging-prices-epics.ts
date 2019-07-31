import { RecordEpicsBase } from '@skysmack/ng-framework';
import { LODGING_PRICES_REDUX_KEY, LodgingPrice } from '@skysmack/packages-reservations-pricings';
import { Injectable } from '@angular/core';
import { getReadDependencies } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';
import { NgLodgingPricesRequests } from './ng-lodging-prices-requests';
import { NgLodgingPricesNotifications } from '../ng-lodging-prices-notifications';
import { NgLodgingsStore, NgLodgingsActions } from '@skysmack/ng-lodgings';

@Injectable({ providedIn: 'root' })
export class NgLodgingPricesEpics extends RecordEpicsBase<LodgingPrice, number> {
    constructor(
        protected requests: NgLodgingPricesRequests,
        protected notifications: NgLodgingPricesNotifications,
        protected skysmackStore: NgSkysmackStore,
        protected lodgingsStore: NgLodgingsStore,
        protected lodgingsActions: NgLodgingsActions
    ) {
        super(requests, LODGING_PRICES_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: LODGING_PRICES_REDUX_KEY,
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
