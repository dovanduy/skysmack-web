import { Injectable } from '@angular/core';
import { RecordEpicsBase } from '@skysmack/ng-redux';
import { ProductType, PRODUCT_TYPES_REDUX_KEY } from '@skysmack/packages-products';
import { NgProductTypesRequests } from './ng-product-types-requests';
import { NgProductTypesNotifications } from '../ng-product-types-notifications';

@Injectable({ providedIn: 'root' })
export class NgProductTypesEpics extends RecordEpicsBase<ProductType, number> {
    constructor(protected requests: NgProductTypesRequests, protected notifications: NgProductTypesNotifications) {
        super(requests, PRODUCT_TYPES_REDUX_KEY, notifications);
    }
}