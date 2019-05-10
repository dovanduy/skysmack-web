import { RecordEpicsBase } from '@skysmack/ng-redux';
import { LODGING_ALLOCATED_PRICES_REDUX_KEY, LodgingAllocatedPrice } from '@skysmack/packages-reservations-pricings';
import { Injectable } from '@angular/core';
import { getReadDependencies } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgLodgingsStore } from '../../../lodgings/lodgings/redux/ng-lodgings-store';
import { NgLodgingsActions } from '../../../lodgings/lodgings/redux/ng-lodgings-actions';
import { NgLodgingAllocatedPricesRequests } from './ng-lodging-allocated-prices-requests';
import { NgLodgingAllocatedPricesNotifications } from '../ng-lodging-allocated-prices-notifications';

@Injectable({ providedIn: 'root' })
export class NgLodgingAllocatedPricesEpics extends RecordEpicsBase<LodgingAllocatedPrice, number> {
    constructor(
        protected requests: NgLodgingAllocatedPricesRequests,
        protected notifications: NgLodgingAllocatedPricesNotifications,
        protected skysmackStore: NgSkysmackStore,
        protected lodgingsStore: NgLodgingsStore,
        protected lodgingsActions: NgLodgingsActions
    ) {
        super(requests, LODGING_ALLOCATED_PRICES_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: LODGING_ALLOCATED_PRICES_REDUX_KEY,
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
