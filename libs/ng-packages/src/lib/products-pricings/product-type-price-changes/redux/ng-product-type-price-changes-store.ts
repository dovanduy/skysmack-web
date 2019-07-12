import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductTypePriceChange, ProductTypePriceChangesAppState, PRODUCT_TYPE_PRICE_CHANGES_REDUCER_KEY } from '@skysmack/packages-products-pricings';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';


@Injectable({ providedIn: 'root' })
export class NgProductTypePriceChangesStore extends NgRecordStore<ProductTypePriceChangesAppState, ProductTypePriceChange, number> {
    constructor(
        protected ngRedux: NgRedux<ProductTypePriceChangesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, PRODUCT_TYPE_PRICE_CHANGES_REDUCER_KEY); }
}
