import { Injectable } from '@angular/core';
import { DocumentRecordEpicsBase } from '@skysmack/ng-redux';
import { ProductType } from '@skysmack/packages-products';
import { NgProductsRequests } from './ng-products-requests';

@Injectable({ providedIn: 'root' })
export class NgProductTypesEpics extends DocumentRecordEpicsBase<ProductType, number> {
    constructor(protected requests: NgProductsRequests) {
        super(requests, 'PRODUCT_TYPES_');
    }
}