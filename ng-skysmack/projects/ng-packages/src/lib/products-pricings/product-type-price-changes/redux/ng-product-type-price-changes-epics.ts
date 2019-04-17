import { RecordEpicsBase } from '@skysmack/ng-redux';
import { ProductTypePriceChange, PRODUCT_TYPE_PRICE_CHANGES_REDUX_KEY } from '@skysmack/packages-products-pricings';
import { Injectable } from '@angular/core';
import { NgProductTypePriceChangesRequests } from './ng-product-type-price-changes-requests';
import { NgProductTypePriceChangesNotifications } from '../ng-product-type-price-changes-notifications';
import { NgSkysmackStore } from '../../../skysmack-core/skysmack/redux/ng-skysmack-store';
import { NgProductTypesStore } from '../../../products/product-types/redux/ng-product-types-store';
import { NgProductTypesActions } from '../../../products/product-types/redux/ng-product-types-actions';
import { getReadDependencies } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgProductTypePriceChangesEpics extends RecordEpicsBase<ProductTypePriceChange, number> {
    constructor(
        protected requests: NgProductTypePriceChangesRequests,
        protected notifications: NgProductTypePriceChangesNotifications,
        protected skysmackStore: NgSkysmackStore,
        protected productTypesStore: NgProductTypesStore,
        protected productTypesActions: NgProductTypesActions
    ) {
        super(requests, PRODUCT_TYPE_PRICE_CHANGES_REDUX_KEY, notifications);
        this.epics = this.epics.concat([
            ...getReadDependencies({
                prefix: PRODUCT_TYPE_PRICE_CHANGES_REDUX_KEY,
                relationIdSelector: 'productTypeId',
                relationSelector: 'productType',
                rsqlIdSelector: 'id',
                skysmackStore: this.skysmackStore,
                store: this.productTypesStore,
                actions: this.productTypesActions
            })
        ]);
    }
}
