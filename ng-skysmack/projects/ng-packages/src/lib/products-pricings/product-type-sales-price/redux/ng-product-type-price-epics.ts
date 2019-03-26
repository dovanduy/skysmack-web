import { RecordEpicsBase } from '@skysmack/ng-redux';
import { ProductTypeSalesPrice, PRODUCT_TYPE_SALES_PRICE_REDUX_KEY } from '@skysmack/packages-products-pricings';
import { Injectable } from '@angular/core';
import { NgProductTypeSalesPriceRequests } from './ng-product-type-sales-price-requests';
import { NgProductTypeSalesPriceNotifications } from '../ng-product-type-sales-price-notifications';

@Injectable({ providedIn: 'root' })
export class NgProductTypeSalesPriceEpics extends RecordEpicsBase<ProductTypeSalesPrice, number> {
    constructor(
        protected requests: NgProductTypeSalesPriceRequests,
        protected notifications: NgProductTypeSalesPriceNotifications
    ) {
        super(requests, PRODUCT_TYPE_SALES_PRICE_REDUX_KEY, notifications);
    }
}
