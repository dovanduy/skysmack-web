import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductTypesAppState, ProductType, PRODUCT_TYPES_REDUCER_KEY } from '@skysmack/packages-products';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgProductTypesStore extends NgRecordStore<ProductTypesAppState, ProductType, number> {
    constructor(
        protected ngRedux: NgRedux<ProductTypesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, PRODUCT_TYPES_REDUCER_KEY); }
}
