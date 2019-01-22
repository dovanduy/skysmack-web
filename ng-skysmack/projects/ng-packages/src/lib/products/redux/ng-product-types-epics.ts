import { Injectable } from '@angular/core';
import { DocumentRecordEpicsBase } from '@skysmack/ng-redux';
import { ProductType } from '@skysmack/packages-products';
import { NgProductTypesRequests } from './ng-product-types-requests';

@Injectable({ providedIn: 'root' })
export class NgProductTypesEpics extends DocumentRecordEpicsBase<ProductType, number> {
    constructor(protected requests: NgProductTypesRequests) {
        super(requests, 'PRODUCT_TYPES_');
    }
}