import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProductPriceChangesAppState, ProductPriceChangesActions } from '@skysmack/packages-products-pricings';

@Injectable({ providedIn: 'root' })
export class NgProductPriceChangesActions extends ProductPriceChangesActions {
    constructor(protected store: NgRedux<ProductPriceChangesAppState>) { super(store); }
}
