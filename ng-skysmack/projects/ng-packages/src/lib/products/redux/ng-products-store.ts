import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Product, ProductsAppState } from '@skysmack/packages-products';
import { NgDocumentRecordStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgProductsStore extends NgDocumentRecordStore<ProductsAppState, Product, number> {
    constructor(protected ngRedux: NgRedux<ProductsAppState>) { super(ngRedux, 'products'); }
}
