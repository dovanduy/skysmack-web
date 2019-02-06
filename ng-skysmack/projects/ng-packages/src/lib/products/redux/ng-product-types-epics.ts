import { Injectable } from '@angular/core';
import { DocumentRecordEpicsBase } from '@skysmack/ng-redux';
import { ProductType } from '@skysmack/packages-products';
import { NgProductTypesRequests } from './ng-product-types-requests';
import { NgProductTypesNotifications } from '../ng-product-types-notifications';

@Injectable({ providedIn: 'root' })
export class NgProductTypesEpics extends DocumentRecordEpicsBase<ProductType, number> {
    constructor(protected requests: NgProductTypesRequests, protected notifications: NgProductTypesNotifications) {
        super(requests, 'PRODUCT_TYPES_', notifications);
    }
}