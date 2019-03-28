import { RecordEpicsBase } from '@skysmack/ng-redux';
import { ProductPriceChange, PRODUCT_PRICE_CHANGES_REDUX_KEY } from '@skysmack/packages-products-pricings';
import { Injectable } from '@angular/core';
import { NgProductPriceChangesRequests } from './ng-product-price-changes-requests';
import { NgProductPriceChangesNotifications } from '../ng-product-price-changes-notifications';

@Injectable({ providedIn: 'root' })
export class NgProductPriceChangesEpics extends RecordEpicsBase<ProductPriceChange, number> {
    constructor(
        protected requests: NgProductPriceChangesRequests,
        protected notifications: NgProductPriceChangesNotifications
    ) {
        super(requests, PRODUCT_PRICE_CHANGES_REDUX_KEY, notifications);
    }
}
