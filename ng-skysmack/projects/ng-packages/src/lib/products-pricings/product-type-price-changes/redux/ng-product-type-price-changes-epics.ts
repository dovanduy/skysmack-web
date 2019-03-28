import { RecordEpicsBase } from '@skysmack/ng-redux';
import { ProductTypePriceChange, PRODUCT_TYPE_PRICE_CHANGES_REDUX_KEY } from '@skysmack/packages-products-pricings';
import { Injectable } from '@angular/core';
import { NgProductTypePriceChangesRequests } from './ng-product-type-price-changes-requests';
import { NgProductTypePriceChangesNotifications } from '../ng-product-type-price-changes-notifications';

@Injectable({ providedIn: 'root' })
export class NgProductTypePriceChangesEpics extends RecordEpicsBase<ProductTypePriceChange, number> {
    constructor(
        protected requests: NgProductTypePriceChangesRequests,
        protected notifications: NgProductTypePriceChangesNotifications
    ) {
        super(requests, PRODUCT_TYPE_PRICE_CHANGES_REDUX_KEY, notifications);
    }
}
