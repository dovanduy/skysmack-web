import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ProductsSalesPrice, ProductsSalesPriceAppState } from '@skysmack/packages-products-pricings';
import { NgRecordStore } from '@skysmack/ng-redux';

@Injectable({ providedIn: 'root' })
export class NgProductsSalesPriceStore extends NgRecordStore<ProductsSalesPriceAppState, ProductsSalesPrice, number> {
    constructor(protected ngRedux: NgRedux<ProductsSalesPriceAppState>) { super(ngRedux, 'productsSalesPrice'); }
}
