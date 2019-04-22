import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductsSalesPrice, ProductsSalesPriceAppState } from '@skysmack/packages-products-pricings';
import { NgRecordStore } from '@skysmack/ng-redux';
import { PRODUCTS_SALES_PRICE_AREA_KEY } from '@skysmack/packages-products-pricings';


@Injectable({ providedIn: 'root' })
export class NgProductsSalesPriceStore extends NgRecordStore<ProductsSalesPriceAppState, ProductsSalesPrice, number> {
    constructor(protected ngRedux: NgRedux<ProductsSalesPriceAppState>) { super(ngRedux, PRODUCTS_SALES_PRICE_AREA_KEY); }
}
