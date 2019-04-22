import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProductTypePriceChangesAppState, ProductTypePriceChangesActions } from '@skysmack/packages-products-pricings';

@Injectable({ providedIn: 'root' })
export class NgProductTypePriceChangesActions extends ProductTypePriceChangesActions {
    constructor(protected store: NgRedux<ProductTypePriceChangesAppState>) { super(store); }
}
