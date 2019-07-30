import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProductsSalesPriceAppState, ProductsSalesPriceActions } from '@skysmack/packages-products-pricings';

@Injectable({ providedIn: 'root' })
export class NgProductsSalesPriceActions extends ProductsSalesPriceActions {
    constructor(protected store: NgRedux<ProductsSalesPriceAppState>) { super(store); }
}
