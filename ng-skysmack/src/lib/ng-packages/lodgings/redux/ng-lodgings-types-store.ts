import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Product, ProductTypesAppState } from '@skysmack/packages-products';
import { NgDocumentRecordReduxStore } from '../../../ng-redux/redux-stores/ng-document-record-redux-store';

@Injectable({ providedIn: 'root' })
export class NgProductTypesStore extends NgDocumentRecordReduxStore<ProductTypesAppState, Product, number> {
    constructor(protected ngRedux: NgRedux<ProductTypesAppState>) { super(ngRedux, 'products'); }
}
