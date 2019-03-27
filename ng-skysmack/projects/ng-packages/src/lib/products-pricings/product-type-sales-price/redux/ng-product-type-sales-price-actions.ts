import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProductTypeSalesPriceAppState, ProductTypeSalesPriceActions } from '@skysmack/packages-products-pricings';

@Injectable({ providedIn: 'root' })
export class NgProductTypeSalesPriceActions extends ProductTypeSalesPriceActions {
    constructor(protected store: NgRedux<ProductTypeSalesPriceAppState>) { super(store); }
}
