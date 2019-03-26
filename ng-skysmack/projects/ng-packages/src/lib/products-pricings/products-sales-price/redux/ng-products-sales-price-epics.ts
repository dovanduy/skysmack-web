import { RecordEpicsBase } from '@skysmack/ng-redux';
import { ProductsSalesPrice, PRODUCTS_SALES_PRICE_REDUX_KEY } from '@skysmack/packages-products-pricings';
import { Injectable } from '@angular/core';
import { NgProductsSalesPriceRequests } from './ng-products-sales-price-requests';
import { NgProductsSalesPriceNotifications } from '../ng-products-sales-price-notifications';

@Injectable({ providedIn: 'root' })
export class NgProductsSalesPriceEpics extends RecordEpicsBase<ProductsSalesPrice, number> {
    constructor(
        protected requests: NgProductsSalesPriceRequests,
        protected notifications: NgProductsSalesPriceNotifications
    ) {
        super(requests, PRODUCTS_SALES_PRICE_REDUX_KEY, notifications);
    }
}
