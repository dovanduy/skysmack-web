import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductTypesAppState, ProductType } from '@skysmack/packages-products';
import { NgDocumentRecordReduxStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgProductTypesStore extends NgDocumentRecordReduxStore<ProductTypesAppState, ProductType, number> {
    constructor(protected ngRedux: NgRedux<ProductTypesAppState>) { super(ngRedux, 'productTypes'); }
}
