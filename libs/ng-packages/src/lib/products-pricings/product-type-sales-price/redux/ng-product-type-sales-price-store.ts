import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductTypeSalesPrice, ProductTypeSalesPriceAppState, PRODUCT_TYPE_SALES_PRICE_REDUCER_KEY } from '@skysmack/packages-products-pricings';
import { NgRecordStore } from '@skysmack/ng-framework';
import { NgSkysmackStore } from '@skysmack/ng-skysmack';


@Injectable({ providedIn: 'root' })
export class NgProductTypeSalesPriceStore extends NgRecordStore<ProductTypeSalesPriceAppState, ProductTypeSalesPrice, number> {
    constructor(
        protected ngRedux: NgRedux<ProductTypeSalesPriceAppState>,
        protected skysmackStore: NgSkysmackStore
    ) { super(ngRedux, skysmackStore, PRODUCT_TYPE_SALES_PRICE_REDUCER_KEY); }
}
