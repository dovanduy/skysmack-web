import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductsSalesPrice, ProductsSalesPriceAppState, PRODUCTS_SALES_PRICE_REDUCER_KEY } from '@skysmack/packages-products-pricings';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-core';

@Injectable({ providedIn: 'root' })
export class NgProductsSalesPriceStore extends NgRecordStore<ProductsSalesPriceAppState, ProductsSalesPrice, number> {
    constructor(
        protected ngRedux: NgRedux<ProductsSalesPriceAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, PRODUCTS_SALES_PRICE_REDUCER_KEY); }
}
