import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductTypeSalesPrice, ProductTypeSalesPriceAppState } from '@skysmack/packages-products-pricings';
import { NgRecordStore } from '@skysmack/ng-redux';


@Injectable({ providedIn: 'root' })
export class NgProductTypeSalesPriceStore extends NgRecordStore<ProductTypeSalesPriceAppState, ProductTypeSalesPrice, number> {
    constructor(protected ngRedux: NgRedux<ProductTypeSalesPriceAppState>) { super(ngRedux, 'productTypeSalesPrice'); }
}
