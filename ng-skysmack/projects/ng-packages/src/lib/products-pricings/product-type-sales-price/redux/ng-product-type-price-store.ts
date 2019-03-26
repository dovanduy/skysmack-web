import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductTypeSalesPrice, ProductTypeSalesPriceAppState } from '@skysmack/packages-products-pricings';
import { NgRecordStore } from '@skysmack/ng-redux';
import { PRODUCT_TYPE_SALES_PRICE_AREA_KEY } from '@skysmack/packages-products-pricings';


@Injectable({ providedIn: 'root' })
export class NgProductTypeSalesPriceStore extends NgRecordStore<ProductTypeSalesPriceAppState, ProductTypeSalesPrice, number> {
    constructor(protected ngRedux: NgRedux<ProductTypeSalesPriceAppState>) { super(ngRedux, PRODUCT_TYPE_SALES_PRICE_AREA_KEY); }
}
