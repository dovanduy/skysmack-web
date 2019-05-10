import { RecordEpicsBase } from '@skysmack/ng-redux';
import { LODGING_TYPE_ALLOCATED_PRICES_REDUX_KEY, LodgingTypeAllocatedPrice } from '@skysmack/packages-reservations-pricings';
import { Injectable } from '@angular/core';
import { getReadDependencies } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgLodgingsStore } from '../../../lodgings/lodgings/redux/ng-lodgings-store';
import { NgLodgingsActions } from '../../../lodgings/lodgings/redux/ng-lodgings-actions';
import { NgLodgingTypeAllocatedPricesRequests } from './ng-lodging-type-allocated-prices-requests';
import { NgLodgingTypeAllocatedPricesNotifications } from '../ng-lodging-type-allocated-prices-notifications';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypeAllocatedPricesEpics extends RecordEpicsBase<LodgingTypeAllocatedPrice, number> {
    constructor(
        protected requests: NgLodgingTypeAllocatedPricesRequests,
        protected notifications: NgLodgingTypeAllocatedPricesNotifications,
        protected skysmackStore: NgSkysmackStore,
        protected lodgingsStore: NgLodgingsStore,
        protected lodgingsActions: NgLodgingsActions
    ) {
        super(requests, LODGING_TYPE_ALLOCATED_PRICES_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: LODGING_TYPE_ALLOCATED_PRICES_REDUX_KEY,
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
