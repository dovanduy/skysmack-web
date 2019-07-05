import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductPriceChange, ProductPriceChangesAppState, PRODUCT_PRICE_CHANGES_REDUCER_KEY } from '@skysmack/packages-products-pricings';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';


@Injectable({ providedIn: 'root' })
export class NgProductPriceChangesStore extends NgRecordStore<ProductPriceChangesAppState, ProductPriceChange, number> {
    constructor(
        protected ngRedux: NgRedux<ProductPriceChangesAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, PRODUCT_PRICE_CHANGES_REDUCER_KEY); }
}
