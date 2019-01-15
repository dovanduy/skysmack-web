import { DocumentRecordEpicsBase } from '@skysmack/ng-redux';
import { Product } from '@skysmack/packages-products';
import { NgProductsRequests } from './ng-products-requests';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NgProductsEpics extends DocumentRecordEpicsBase<Product, number> {
    constructor(protected requests: NgProductsRequests) {
        super(requests, 'PRODUCTS_');
    }
}
