import { RecordEpicsBase } from '@skysmack/ng-redux';
import { Product, PRODUCTS_REDUX_KEY } from '@skysmack/packages-products';
import { NgProductsRequests } from './ng-products-requests';
import { Injectable } from '@angular/core';
import { NgProductsNotifications } from '../ng-products-notifications';

@Injectable({ providedIn: 'root' })
export class NgProductsEpics extends RecordEpicsBase<Product, number> {
    constructor(protected requests: NgProductsRequests, protected notifications: NgProductsNotifications) {
        super(requests, PRODUCTS_REDUX_KEY, notifications);
    }
}
