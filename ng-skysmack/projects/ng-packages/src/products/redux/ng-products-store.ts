import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Product, ProductsAppState } from '@skysmack/packages-products';
import { NgDocumentRecordReduxStore } from '../../../ng-redux/redux-stores/ng-document-record-redux-store';

@Injectable({ providedIn: 'root' })
export class NgProductsStore extends NgDocumentRecordReduxStore<ProductsAppState, Product, number> {
    constructor(protected ngRedux: NgRedux<ProductsAppState>) { super(ngRedux, 'products'); }
}
