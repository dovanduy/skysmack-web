import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductTypesAppState, ProductType } from '@skysmack/packages-products';
import { NgDocumentRecordReduxStore } from '../../../ng-redux/redux-stores/ng-document-record-redux-store';

@Injectable({ providedIn: 'root' })
export class NgProductTypesStore extends NgDocumentRecordReduxStore<ProductTypesAppState, ProductType, number> {
    constructor(protected ngRedux: NgRedux<ProductTypesAppState>) { super(ngRedux, 'productTypes'); }
}
