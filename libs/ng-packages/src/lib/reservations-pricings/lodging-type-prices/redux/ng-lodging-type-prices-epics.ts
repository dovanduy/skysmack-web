import { RecordEpicsBase } from '@skysmack/ng-redux';
import { LODGING_TYPE_PRICES_REDUX_KEY, LodgingTypePrice } from '@skysmack/packages-reservations-pricings';
import { Injectable } from '@angular/core';
import { getReadDependencies } from '@skysmack/ng-redux';
import { NgSkysmackStore } from '@skysmack/ng-core';
import { NgLodgingTypePricesNotifications } from '../ng-lodging-type-prices-notifications';
import { NgLodgingTypePricesRequests } from './ng-lodging-type-prices-requests';
import { NgLodgingTypesStore } from '../../../lodgings/lodging-types/redux/ng-lodgings-types-store';
import { NgLodgingTypesActions } from '../../../lodgings/lodging-types/redux/ng-lodging-types-actions';

@Injectable({ providedIn: 'root' })
export class NgLodgingTypePricesEpics extends RecordEpicsBase<LodgingTypePrice, number> {
    constructor(
        protected requests: NgLodgingTypePricesRequests,
        protected notifications: NgLodgingTypePricesNotifications,
        protected skysmackStore: NgSkysmackStore,
        protected lodgingTypesStore: NgLodgingTypesStore,
        protected lodgingTypesActions: NgLodgingTypesActions
    ) {
        super(requests, LODGING_TYPE_PRICES_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: LODGING_TYPE_PRICES_REDUX_KEY,
                relationIdSelector: 'recordId',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.lodgingTypesStore,
                actions: this.lodgingTypesActions,
                dependencyIndexes: [0, 0]
            })
        ]);
    }
}
